import bip39 from 'bip39'
import crypto from 'crypto'
import ed25519 from 'ed25519'
import hdkey from 'hdkey'
import secp256k1 from 'secp256k1'

export enum EncryptionScheme {
	NONE = 0x00,
	DH_ADD_EPH_AESGCM256_SCRYPT_000 = 0xff,
}

interface Encryption {
	encrypt(publicKey: string, message: string): EncodedMessage
	decrypt(message: EncodedMessage): string
}

export interface KeyPair {
	publicKey: string
	encryptions: { [key in Exclude<EncryptionScheme, EncryptionScheme.NONE>]: Encryption }

	sign(message: string): string
	signHash(message: string): string
}

interface EllipticCurve {
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

export function entropyToMnemonic(entropyHex: string): string {
	const entropy = Buffer.from(entropyHex, 'hex')
	const mnemonic = bip39.entropyToMnemonic(entropy)
	return mnemonic
}

// Service implementation for secp256k1 curve
export const secp256k1Service: EllipticCurve = {
	fromPrivateKeyHex(privateKeyHex: string): KeyPair {
		const keyPair = secp256k1.keyFromPrivate(privateKeyHex, 'hex')

		const publicKey = keyPair.getPublic().encode('hex', true)

		return {
			publicKey,

			sign(message: string): string {
				const signature = keyPair.sign(message)
				const derSignature = signature.toDER('hex')
				return derSignature
			},

			signHash(message: string): string {
				const hash = crypto.createHash('sha256').update(message).digest()
				const signature = keyPair.sign(hash)
				const derSignature = signature.toDER('hex')
				return derSignature
			},

			encryptions: {
				[EncryptionScheme.DH_ADD_EPH_AESGCM256_SCRYPT_000]: {
					encrypt(message: string): EncodedMessage {
						const ephemeralKeyPair = secp256k1.genKeyPair()
						const ephemeralPublicKey = ephemeralKeyPair.getPublic()

						const sharedSecret = secp256k1.keyFromPublic(ephemeralPublicKey).derive(keyPair.getPrivate())

						const key = crypto.scryptSync(sharedSecret.toArrayLike(Buffer, 'be', 32), crypto.randomBytes(16), 32)
						const iv = crypto.randomBytes(12)

						const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
						const ciphertext = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()])
						const authTag = cipher.getAuthTag()

						return {
							ephemeralPublicKey: ephemeralPublicKey.encode('array', true),
							iv,
							authTag,
							ciphertext,
						}
					},

					decrypt(input: EncodedMessage): string {
						const sharedSecret = secp256k1.keyFromPublic(input.ephemeralPublicKey).derive(keyPair.getPrivate())

						const key = crypto.scryptSync(sharedSecret.toArrayLike(Buffer, 'be', 32), input.iv, 32)
						const decipher = crypto.createDecipheriv('aes-256-gcm', key, input.iv)
						decipher.setAuthTag(input.authTag)

						const decryptedBuffer = Buffer.concat([decipher.update(input.ciphertext), decipher.final()])

						return decryptedBuffer.toString('utf8')
					},
				},
			},
		}
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

// Service implementation for Ed25519 curve
export const ed25519Service: EllipticCurve = {
	fromPrivateKeyHex(privateKeyHex: string): KeyPair {
		const keyPair = ed25519.MakeKeypair(privateKeyHex)

		return {
			publicKey: keyPair.publicKey.toString('hex'),

			sign(message: string): string {
				const signature = ed25519.Sign(Buffer.from(message, 'utf8'), keyPair.privateKey)
				return signature.toString('hex')
			},

			signHash(message: string): string {
				const hash = crypto.createHash('sha256').update(message).digest()
				const signature = ed25519.Sign(hash, keyPair.privateKey)
				return signature.toString('hex')
			},

			encryptions: {
				[EncryptionScheme.DH_ADD_EPH_AESGCM256_SCRYPT_000]: {
					encrypt(message: string): EncodedMessage {
						const ephemeralKeyPair = ed25519.keyFromSecret(crypto.randomBytes(32))
						const ephemeralPublicKey = ephemeralKeyPair.getPublic()

						const sharedSecret = ephemeralKeyPair.derive(keyPair.getPublic())
						const key = crypto.scryptSync(sharedSecret.toArrayLike(Buffer, 'be', 32), crypto.randomBytes(16), 32)

						const iv = crypto.randomBytes(12)
						const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)

						const encryptedBuffer = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()])
						const authTag = cipher.getAuthTag()

						return {
							ephemeralPublicKey: ephemeralPublicKey.encode('array', true),
							iv,
							authTag,
							ciphertext: encryptedBuffer,
						}
					},

					decrypt(input: EncodedMessage): string {
						const sharedSecret = ed25519.keyFromPublic(input.ephemeralPublicKey).derive(keyPair.getSecret())
						const key = crypto.scryptSync(sharedSecret.toArrayLike(Buffer, 'be', 32), input.iv, 32)

						const decipher = crypto.createDecipheriv('aes-256-gcm', key, input.iv)
						decipher.setAuthTag(input.authTag)

						const decryptedBuffer = Buffer.concat([decipher.update(input.ciphertext), decipher.final()])

						return decryptedBuffer.toString('utf8')
					},
				},
			},
		}
	},

	fromSeed(seed: string): KeyPair {
		const privateKey = ed25519.MakeKeypairSeed(Buffer.from(seed, 'hex')).privateKey.toString('hex')
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
