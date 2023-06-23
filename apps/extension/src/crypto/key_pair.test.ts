import * as crypto from 'crypto'
import * as ed25519 from 'ed25519'
import { ec as EC } from 'elliptic'

import { ed25519Service, secp256k1Service } from './key_pair'

describe('secp256k1Service', () => {
	const publicKey = '0325e1d56e8a1761fb4e0f35f928dc3ef35e1d209d987ed759ac3b66e158df1096'
	const privateKey = '80a3f2d4e8d0f18477dbb6e9b02e7054f6d6cfd6e787bbaeb924af51e7a8282d'
	const message = 'Hello, World!'

	it('should encrypt and decrypt message', () => {
		const service = secp256k1Service.fromPrivateKeyHex(privateKey)
		const encrypted = service.encrypt(publicKey, message)
		const decrypted = service.decrypt(encrypted)
		expect(decrypted).toBe(message)
	})

	it('should sign and verify message', () => {
		const service = secp256k1Service.fromPrivateKeyHex(privateKey)
		const signature = service.sign(message)
		const ec = new EC('secp256k1')
		const keyPair = ec.keyFromPublic(publicKey, 'hex')
		const verified = keyPair.verify(message, signature)
		expect(verified).toBe(true)
	})

	it('should sign and verify hash', () => {
		const hash = crypto.createHash('sha256').update(message).digest()
		const service = secp256k1Service.fromPrivateKeyHex(privateKey)
		const signature = service.signHash(hash.toString('hex'))
		const ec = new EC('secp256k1')
		const keyPair = ec.keyFromPublic(publicKey, 'hex')
		const verified = keyPair.verify(hash, signature)
		expect(verified).toBe(true)
	})
})

describe('ed25519Service', () => {
	const publicKey = '5ef1f542e5fe32df135ba9a86fb4f366ff7e18a59cc775ec9dbf1c0d56a3ccca'
	const privateKey =
		'd1228ab1fb3a124f05beaeba59ad0ae51adfa5ef6f49b44115b0ebd72e6df3155ef1f542e5fe32df135ba9a86fb4f366ff7e18a59cc775ec9dbf1c0d56a3ccca'
	const message = 'Hello, World!'

	it('should encrypt and decrypt message', () => {
		const service = ed25519Service.fromPrivateKeyHex(privateKey)
		const encrypted = service.encrypt(publicKey, message)
		const decrypted = service.decrypt(encrypted)
		expect(decrypted).toBe(message)
	})

	it('should sign and verify message', () => {
		const service = ed25519Service.fromPrivateKeyHex(privateKey)
		const signature = service.sign(message)
		const verified = ed25519.Verify(
			Buffer.from(message, 'utf8'),
			Buffer.from(signature, 'hex'),
			Buffer.from(publicKey, 'hex'),
		)
		expect(verified).toBe(true)
	})

	it('should sign and verify hash', () => {
		const hash = crypto.createHash('sha256').update(message).digest()
		const service = ed25519Service.fromPrivateKeyHex(privateKey)
		const signature = service.signHash(hash.toString('hex'))
		const verified = ed25519.Verify(hash, Buffer.from(signature, 'hex'), Buffer.from(publicKey, 'hex'))
		expect(verified).toBe(true)
	})
})
