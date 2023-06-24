import { ed25519Service, secp256k1Service } from './key_pair'
import { decodeMessage, encodeMessage } from './message'

const curves = [ed25519Service, secp256k1Service]

describe('elliptic curve', () => {
	curves.forEach(curve => {
		describe('elliptic curve', () => {
			const alice = curve.generateNew()
			const bob = curve.generateNew()

			describe('can decrypt newly encrypted message', () => {
				const aliceEncryptToBob = (message: string) => encodeMessage(alice, message, bob.publicKey)
				const aliceEncryptToSelf = (message: string) => encodeMessage(alice, message, alice.publicKey)

				const aliceDecrypt = (message: string) => decodeMessage(alice, message)
				const bobDecrypt = (message: string) => decodeMessage(bob, message)

				it('encrypted message can be decrypted by both sender and receiver', async () => {
					const plaintext = 'Hey Bob!'
					const encryptedMessage = aliceEncryptToBob(plaintext)
					expect(encryptedMessage.length).toBeLessThanOrEqual(255)
					const decryptedByAlice = aliceDecrypt(encryptedMessage)
					expect(decryptedByAlice).toBe(plaintext)

					const decryptedByBob = bobDecrypt(encryptedMessage)
					expect(decryptedByBob).toBe(plaintext)

					expect(decryptedByBob).toBe(decryptedByAlice)
				})

				it('encrypted message to self can be decrypted by self', async () => {
					const plaintext = 'Hey Bob!'
					const encryptedMessage = aliceEncryptToSelf(plaintext)
					expect(encryptedMessage.length).toBeLessThanOrEqual(255)
					const decryptedByAlice = aliceDecrypt(encryptedMessage)
					expect(decryptedByAlice).toBe(plaintext)
				})

				it('encrypted message to self can not be decrypted by bob', async () => {
					const plaintext = 'Hey Bob!'
					const encryptedMessage = aliceEncryptToSelf(plaintext)
					expect(encryptedMessage.length).toBeLessThanOrEqual(255)
					const decryptedByBob = bobDecrypt(encryptedMessage)
					expect(decryptedByBob).not.toBe(plaintext)
				})
			})
		})
	})
})
