import { secp256k1 } from '../../src/crypto/key_pair'
import { decodeMessage, encodeMessage } from '../../src/crypto/message'
import { sha256 } from '../../src/crypto/sha'

const curves = {
	// ed25519,
	secp256k1,
}

Object.entries(curves).forEach(([name, curve]) => {
	describe(`keypair ${name}`, () => {
		describe('can generate signatures and encrypt, decrypt messages', () => {
			const alice = curve.generateNew()
			const bob = curve.generateNew()

			describe('can sign and verify signature', () => {
				const message = 'Hello, World!'

				it('should sign and verify message', () => {
					const signature = alice.sign(message)
					const verified = alice.verify(message, signature)
					expect(verified).toBe(true)
				})

				it('should sign and verify hash', () => {
					const hash = sha256(sha256(message))
					const signature = alice.sign(hash)
					const verified = alice.verify(hash, signature)
					expect(verified).toBe(true)
				})
			})

			describe('can decrypt newly encrypted message', () => {
				const aliceEncryptToBob = (message: string) => encodeMessage(alice, message, bob.publicKey)

				const aliceDecrypt = (message: string) => decodeMessage(alice, message, bob.publicKey)
				const bobDecrypt = (message: string) => decodeMessage(bob, message, alice.publicKey)

				it('encrypted message can be decrypted by both sender and receiver', () => {
					const plaintext = 'Hey Bob, this is Alice, you and I can read this message, but no one else.'

					const encryptedMessage = aliceEncryptToBob(plaintext)

					const decryptedByAlice = aliceDecrypt(encryptedMessage)
					expect(decryptedByAlice).toBe(plaintext)

					const decryptedByBob = bobDecrypt(encryptedMessage)
					expect(decryptedByBob).toBe(plaintext)

					expect(decryptedByBob).toBe(decryptedByAlice)
				})

				it('encrypted message to self can be decrypted by self', () => {
					const aliceEncryptToSelf = (message: string) => encodeMessage(alice, message, alice.publicKey)
					const aliceDecryptSelf = (message: string) => decodeMessage(alice, message, alice.publicKey)

					const plaintext = 'Hey Bob!'

					const encryptedMessage = aliceEncryptToSelf(plaintext)

					const decryptedByAlice = aliceDecryptSelf(encryptedMessage)
					expect(decryptedByAlice).toBe(plaintext)
				})
			})
		})
	})

	describe('can decrypt message from buffer that was encrypted earlier', () => {
		const alice = curve.fromPrivateKeyHex(BigInt(1).toString(16))
		const bob = curve.fromPrivateKeyHex(BigInt(2).toString(16))

		const aliceDecrypt = (message: string) => decodeMessage(alice, message, bob.publicKey)
		const bobDecrypt = (message: string) => decodeMessage(bob, message, alice.publicKey)

		const plaintext = 'Hey Bob, this is Alice, you and I can read this message, but no one else.'
		const encryptedMessageByAliceToBob =
			'01ff02663a6aaf4d5ec607330b9b74a840bf5c13b0a7357202fa85be56b1326065561657d6ee46d4d84e94ec615b425a472dd8c813bad125335a097d29b64b72319357406b2b04491b4ca1a5a05fe8772b0c05f4633b399914348c5b03af58445d42c2f740f8407e572775a571805e582c6b96ffd4ccca764f2002510abddaab735ee4fb0b18c26d'

		it('alice can decrypt msg encrypted by herself', () => {
			const decryptedByAlice = aliceDecrypt(encryptedMessageByAliceToBob)
			expect(decryptedByAlice).toBe(plaintext)
		})

		it('bob can decrypt msg encrypted by alice', () => {
			const decryptedByBob = bobDecrypt(encryptedMessageByAliceToBob)
			expect(decryptedByBob).toBe(plaintext)
		})
	})
})
