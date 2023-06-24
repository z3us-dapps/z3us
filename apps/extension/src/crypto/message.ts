import { EncryptionScheme, type KeyPair } from './key_pair'

enum MessageType {
	PLAINTEXT = 0x00,
	ENCRYPTED = 0x01,
	HEX = 0x1e,
}

export interface EncodedMessage {
	ephemeralPublicKey: Buffer
	iv: Buffer
	authTag: Buffer
	ciphertext: Buffer
}

const ephemeralPublicKeyLength = 33
const nonceLength = 12
const tagLength = 16

export function decodeMessage(keyPair: KeyPair, encryptedMessage: string) {
	const encryptedBuffer = Buffer.from(encryptedMessage, 'hex')

	const messageType = encryptedBuffer.readUIntBE(0, 1)
	const encryptionScheme = encryptedBuffer.readUIntBE(1, 1)
	const ephemeralPublicKey = encryptedBuffer.subarray(2, 2 + ephemeralPublicKeyLength)
	const iv = encryptedBuffer.subarray(2 + ephemeralPublicKeyLength, 2 + ephemeralPublicKeyLength + nonceLength)
	const authTag = encryptedBuffer.subarray(
		2 + ephemeralPublicKeyLength + nonceLength,
		2 + ephemeralPublicKeyLength + nonceLength + tagLength,
	)
	const ciphertext = encryptedBuffer.subarray(2 + ephemeralPublicKeyLength + nonceLength + tagLength)

	switch (messageType) {
		case MessageType.ENCRYPTED:
			if (!keyPair.encryptions[encryptionScheme]) {
				throw new Error(`Missing encryption scheme: ${encryptionScheme}`)
			}
			return keyPair.encryptions[encryptionScheme].decrypt({
				ephemeralPublicKey,
				iv,
				authTag,
				ciphertext,
			})
		case MessageType.HEX:
			return ciphertext.toString('hex')
		case MessageType.PLAINTEXT:
		default:
			return ciphertext.toString('utf-8')
	}
}

export function encodeMessage(keyPair: KeyPair, message: string, publicKey: string = '') {
	const encrypt = publicKey !== ''
	if (!encrypt) {
		return Buffer.concat([
			Buffer.from([MessageType.PLAINTEXT]),
			Buffer.from([EncryptionScheme.NONE]),
			Buffer.from(message, 'utf-8'),
		]).toString('hex')
	}

	const encryptionScheme = EncryptionScheme.DH_ADD_EPH_AESGCM256_SCRYPT_000
	if (!keyPair.encryptions[encryptionScheme]) {
		throw new Error(`Missing encryption scheme: ${encryptionScheme}`)
	}

	const encryptedMessage = keyPair.encryptions[encryptionScheme].encrypt(publicKey, message)

	return Buffer.concat([
		Buffer.from([MessageType.ENCRYPTED]),
		Buffer.from([EncryptionScheme.DH_ADD_EPH_AESGCM256_SCRYPT_000]),
		encryptedMessage.ephemeralPublicKey,
		encryptedMessage.iv,
		encryptedMessage.authTag,
		encryptedMessage.ciphertext,
	]).toString('hex')
}
