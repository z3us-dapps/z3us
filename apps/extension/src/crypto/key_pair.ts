// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import bip39 from 'bip39'
import crypto from 'crypto'
import elliptic from 'elliptic'
import hdkey from 'hdkey'

import { nonceLength, scryptOptions } from './constants'
import { sha256 } from './sha'

export enum EncryptionScheme {
	NONE = 0x00,
	DH_ADD_EPH_AESGCM256_SCRYPT_000 = 0xff,
}

export interface KeyPair {
	publicKey: string
	encryptions: { [key in Exclude<EncryptionScheme, EncryptionScheme.NONE>]: Encryption }

	sign(message: string): string
	verify(message: string, signature: string): boolean
}

interface Encryption {
	encrypt(publicKeyOfOtherParty: string, message: string): EncodedMessage
	decrypt(publicKeyOfOtherParty: string, message: EncodedMessage): string
}

interface EllipticCurve {
	generateNew(): KeyPair
	fromPrivateKeyHex(privateKeyHex: string): KeyPair
	fromSeed(seed: string): KeyPair
	fromMnemonic(mnemonic: string): KeyPair
	fromExtendedPrivateKey(xpriv: string): KeyPair
}

interface EncodedMessage {
	ephemeralPublicKey: Buffer
	iv: Buffer
	authTag: Buffer
	ciphertext: Buffer
}

const secp256k1Curve = elliptic.ec('secp256k1')

// Service implementation for secp256k1 curve
export const secp256k1: EllipticCurve = {
	fromPrivateKeyHex(privateKeyHex: string): KeyPair {
		const keyPair = secp256k1Curve.keyFromPrivate(privateKeyHex, 'hex')

		const calculateSharedSecret = (publicKeyOfOtherParty: string, ephemeralPublicKey: string): Buffer => {
			const otherPartyKeyPair = secp256k1Curve.keyFromPublic(publicKeyOfOtherParty, 'hex')
			const ephemeralKeyPair = secp256k1Curve.keyFromPublic(ephemeralPublicKey, 'hex')

			const diffieHellmanPoint = otherPartyKeyPair.getPublic().mul(keyPair.getPrivate())
			const sharedSecretPoint = diffieHellmanPoint.add(ephemeralKeyPair.getPublic())

			return Buffer.from(sharedSecretPoint.getX().toArray('be', 32))
		}

		return {
			publicKey: keyPair.getPublic().encode('hex', true),

			sign(message: string): string {
				return keyPair.sign(message).toDER('hex')
			},

			verify(message: string, signature: string): boolean {
				return keyPair.verify(message, signature)
			},

			encryptions: {
				[EncryptionScheme.DH_ADD_EPH_AESGCM256_SCRYPT_000]: {
					encrypt(publicKeyOfOtherParty: string, message: string): EncodedMessage {
						const ephemeralPublicKey = secp256k1Curve.genKeyPair().getPublic()
						const ephemeralPublicKeyData = Buffer.from(ephemeralPublicKey.encodeCompressed())
						const sharedSecret = calculateSharedSecret(publicKeyOfOtherParty, ephemeralPublicKeyData.toString('hex'))

						const iv = crypto.randomBytes(nonceLength)
						const salt = Buffer.from(sha256(iv), 'hex')

						const key = crypto.scryptSync(sharedSecret, salt, 32, scryptOptions)

						const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
						cipher.setAAD(ephemeralPublicKeyData)

						const ciphertext = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()])
						const authTag = cipher.getAuthTag()

						return {
							ephemeralPublicKey: ephemeralPublicKeyData,
							iv,
							authTag,
							ciphertext,
						}
					},

					decrypt(publicKeyOfOtherParty: string, input: EncodedMessage): string {
						const sharedSecret = calculateSharedSecret(publicKeyOfOtherParty, input.ephemeralPublicKey.toString('hex'))

						const salt = Buffer.from(sha256(input.iv), 'hex')
						const key = crypto.scryptSync(sharedSecret, salt, 32, scryptOptions)

						const decipher = crypto.createDecipheriv('aes-256-gcm', key, input.iv)
						decipher.setAuthTag(input.authTag)
						decipher.setAAD(input.ephemeralPublicKey)

						const decryptedBuffer = Buffer.concat([decipher.update(input.ciphertext), decipher.final()])

						return decryptedBuffer.toString('utf8')
					},
				},
			},
		}
	},

	generateNew(): KeyPair {
		const keyPair = secp256k1Curve.genKeyPair()
		const privateKey = keyPair.getPrivate()

		return this.fromPrivateKeyHex(privateKey.toString('hex'))
	},

	fromSeed(seed: string): KeyPair {
		const root = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
		// const key = root.derive("m/44'/0'/0'/0/0")
		const privateKeyHex = root.privateKey.toString('hex')
		return this.fromPrivateKeyHex(privateKeyHex)
	},

	fromMnemonic(mnemonic: string): KeyPair {
		const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
		return this.fromSeed(seed)
	},

	fromExtendedPrivateKey(xpriv: string): KeyPair {
		const root = hdkey.fromJSON({ xpriv, xpub: 'not used' })
		const privateKeyHex = root.privateKey.toString('hex')
		return this.fromPrivateKeyHex(privateKeyHex)
	},
}

const ed25519Curve = elliptic.eddsa('ed25519')

// Service implementation for Ed25519 curve
export const ed25519: EllipticCurve = {
	fromPrivateKeyHex(privateKeyHex: string): KeyPair {
		const privateKey = Buffer.from(privateKeyHex, 'hex')
		const keyPair = ed25519Curve.keyFromSecret(privateKey)

		const calculateSharedSecret = (publicKeyOfOtherParty: string, ephemeralPublicKey: string): Buffer => {
			const ephemeralKeyPair = ed25519Curve.keyFromPublic(ephemeralPublicKey, 'hex')

			const diffieHellmanPoint = keyPair.derive(publicKeyOfOtherParty)
			const sharedSecretPoint = diffieHellmanPoint.add(ephemeralKeyPair.getPublic())

			return Buffer.from(sharedSecretPoint.getX().toArray('be', 32))
		}

		return {
			publicKey: keyPair.getPublic('hex'),

			sign(message: string): string {
				return keyPair.sign(message)
			},

			verify(message: string, signature: string): boolean {
				return keyPair.verify(message, signature)
			},

			encryptions: {
				[EncryptionScheme.DH_ADD_EPH_AESGCM256_SCRYPT_000]: {
					encrypt(publicKeyOfOtherParty: string, message: string): EncodedMessage {
						const ephemeralKeyPair = ed25519Curve.keyFromSecret(crypto.randomBytes(32))
						const ephemeralPublicKeyData = ephemeralKeyPair.getPublic()
						const sharedSecret = calculateSharedSecret(publicKeyOfOtherParty, ephemeralPublicKeyData.toString('hex'))

						const iv = crypto.randomBytes(nonceLength)
						const salt = Buffer.from(sha256(iv), 'hex')

						const key = crypto.scryptSync(sharedSecret, salt, 32, scryptOptions)

						const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
						cipher.setAAD(ephemeralPublicKeyData)

						const ciphertext = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()])
						const authTag = cipher.getAuthTag()

						return {
							ephemeralPublicKey: ephemeralPublicKeyData,
							iv,
							authTag,
							ciphertext,
						}
					},

					decrypt(publicKeyOfOtherParty: string, input: EncodedMessage): string {
						const sharedSecret = calculateSharedSecret(publicKeyOfOtherParty, input.ephemeralPublicKey.toString('hex'))

						const salt = Buffer.from(sha256(input.iv), 'hex')
						const key = crypto.scryptSync(sharedSecret, salt, 32, scryptOptions)

						const decipher = crypto.createDecipheriv('aes-256-gcm', key, input.iv)
						decipher.setAuthTag(input.authTag)
						decipher.setAAD(input.ephemeralPublicKey)

						const decryptedBuffer = Buffer.concat([decipher.update(input.ciphertext), decipher.final()])

						return decryptedBuffer.toString('utf8')
					},
				},
			},
		}
	},

	generateNew(): KeyPair {
		const keyPair = ed25519Curve.keyFromSecret(elliptic.rand(32))
		const privateKey = keyPair.getSecret()

		return this.fromPrivateKeyHex(privateKey.toString('hex'))
	},

	fromSeed(seed: string): KeyPair {
		const privateKey = ed25519Curve.MakeKeypairSeed(Buffer.from(seed, 'hex')).privateKey.toString('hex')
		return this.fromPrivateKeyHex(privateKey)
	},

	fromMnemonic(mnemonic: string): KeyPair {
		const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
		return this.fromSeed(seed)
	},

	fromExtendedPrivateKey(hex: string): KeyPair {
		return this.fromPrivateKeyHex(hex)
	},
}
