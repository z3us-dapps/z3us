import bip39 from 'bip39'
import crypto from 'crypto'
import ed25519 from 'ed25519'
import { ec as EC } from 'elliptic'
import hdkey from 'hdkey'
import secp256k1 from 'secp256k1'

const ec = new EC('secp256k1')

export interface KeyPair {
	publicKey: string
	privateKey: string

	sign(message: string): string
	signHash(message: string): string
	encrypt(publicKey: string, message: string): EncryptionMessageEnvelope
	decrypt(messageEnvelope: EncryptionMessageEnvelope): string
}

interface EncryptionMessageEnvelope {
	encryptedMessage: string
	iv: Buffer
	authTag: Buffer
}

interface EllipticCurve {
	fromPrivateKeyHex(privateKeyHex: string): KeyPair
	fromSeed(seed: string): KeyPair
	fromMnemonic(mnemonic: string): KeyPair
	fromExtendedPrivateKey(xpriv: string): KeyPair
}

export const entropyToMnemonic = (entropyHex: string): string => {
	const entropy = Buffer.from(entropyHex, 'hex')
	const mnemonic = bip39.entropyToMnemonic(entropy)
	return mnemonic
}

// Service implementation for secp256k1 curve
export const secp256k1Service: EllipticCurve = {
	fromPrivateKeyHex(privateKeyHex) {
		const keyPair = ec.keyFromPrivate(privateKeyHex, 'hex')

		return {
			publicKey: keyPair.getPublic().encode('hex', true),
			privateKey: privateKeyHex,

			sign(message) {
				const signature = keyPair.sign(message)
				const derSignature = signature.toDER('hex')
				return derSignature
			},

			signHash(message) {
				const hash = crypto.createHash('sha256').update(message).digest()
				const signature = keyPair.sign(hash)
				const derSignature = signature.toDER('hex')
				return derSignature
			},

			encrypt(publicKey: string, message: string) {
				const publicKeyBuffer = Buffer.from(publicKey, 'hex')
				const sharedSecret = secp256k1.ecdh(publicKeyBuffer, keyPair.getPrivate())

				const iv = crypto.randomBytes(12)
				const cipher = crypto.createCipheriv('aes-256-gcm', sharedSecret, iv)
				const encryptedMessage = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()])
				const authTag = cipher.getAuthTag()

				return {
					encryptedMessage: encryptedMessage.toString('hex'),
					iv,
					authTag,
				}
			},

			decrypt(messageEnvelope) {
				const sharedSecret = secp256k1.ecdh(keyPair.getPublic(), keyPair.getPrivate())

				const decipher = crypto.createDecipheriv('aes-256-gcm', sharedSecret, messageEnvelope.iv)
				decipher.setAuthTag(messageEnvelope.authTag)
				const decryptedMessage = Buffer.concat([
					decipher.update(Buffer.from(messageEnvelope.encryptedMessage, 'hex')),
					decipher.final(),
				])

				return decryptedMessage.toString('utf8')
			},
		}
	},

	fromSeed(seed) {
		const root = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'))
		// const key = root.derive("m/44'/0'/0'/0/0")
		const privateKeyHex = root.privateKey.toString('hex')
		return this.fromPrivateKeyHex(privateKeyHex)
	},

	fromMnemonic(mnemonic) {
		const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
		return this.fromSeed(seed)
	},

	fromExtendedPrivateKey(xpriv: string) {
		const root = hdkey.fromJSON({ xpriv, xpub: 'not used' })
		const privateKeyHex = root.privateKey.toString('hex')
		return this.fromPrivateKeyHex(privateKeyHex)
	},
}

// Service implementation for Ed25519 curve
export const ed25519Service: EllipticCurve = {
	fromPrivateKeyHex(privateKeyHex) {
		const keyPair = ed25519.MakeKeypair(privateKeyHex)

		return {
			publicKey: keyPair.publicKey.toString('hex'),
			privateKey: privateKeyHex,

			sign(message) {
				const signature = ed25519.Sign(Buffer.from(message, 'utf8'), keyPair.privateKey)
				return signature.toString('hex')
			},

			signHash(message) {
				const hash = crypto.createHash('sha256').update(message).digest()
				const signature = ed25519.Sign(hash, keyPair.privateKey)
				return signature.toString('hex')
			},

			encrypt(publicKey, message) {
				const sharedSecret = ed25519.Curve25519(keyPair.privateKey, Buffer.from(publicKey, 'hex'))

				const iv = crypto.randomBytes(12)
				const cipher = crypto.createCipheriv('aes-256-gcm', sharedSecret, iv)
				const encryptedMessage = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()])
				const authTag = cipher.getAuthTag()

				return {
					encryptedMessage: encryptedMessage.toString('hex'),
					iv,
					authTag,
				}
			},

			decrypt(messageEnvelope) {
				const sharedSecret = ed25519.Curve25519(keyPair.privateKey, messageEnvelope.iv)

				const decipher = crypto.createDecipheriv('aes-256-gcm', sharedSecret, messageEnvelope.iv)
				decipher.setAuthTag(messageEnvelope.authTag)
				const decryptedMessage = Buffer.concat([
					decipher.update(Buffer.from(messageEnvelope.encryptedMessage, 'hex')),
					decipher.final(),
				])

				return decryptedMessage.toString('utf8')
			},
		}
	},

	fromSeed(seed) {
		const privateKey = ed25519.MakeKeypairSeed(Buffer.from(seed, 'hex')).privateKey.toString('hex')
		return this.fromPrivateKeyHex(privateKey)
	},

	fromMnemonic(mnemonic) {
		const seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
		return this.fromSeed(seed)
	},

	fromExtendedPrivateKey(hex: string) {
		return this.fromPrivateKeyHex(hex)
	},
}
