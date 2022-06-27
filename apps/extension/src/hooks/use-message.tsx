import { useCallback } from 'react'
import { Message } from '@radixdlt/crypto'
import { useStore } from '@src/store'
import { EncryptMessage } from '@src/services/radix/message'
import { useRadix } from '@src/hooks/use-radix'
import { parseAccountAddress } from '@src/services/radix/serializer'

export const useMessage = () => {
	const radix = useRadix()
	const { account } = useStore(state => ({
		account: state.account,
	}))

	const createMessage = useCallback(
		async (plaintext: string, recipientAddress: string = ''): Promise<string> => {
			if (!plaintext) {
				throw new Error('Invalid message')
			}
			let buffer: Buffer
			if (recipientAddress !== '') {
				buffer = await EncryptMessage(account, recipientAddress, plaintext)
			} else {
				const plain = Message.createPlaintext(plaintext)
				buffer = plain.bytes
			}
			return buffer.toString('hex')
		},
		[account],
	)

	const decryptMessage = useCallback(
		async (from: string, msg: string): Promise<string> => {
			if (Message.isPlaintext(msg)) {
				return Message.plaintextToString(Buffer.from(msg, 'hex'))
			}
			if (!Message.isEncrypted(msg)) {
				return msg
			}

			const messageBuffer = Buffer.from(msg, 'hex')
			const encryptedMessageResult = Message.fromBuffer(messageBuffer)
			if (!encryptedMessageResult.isOk()) {
				return msg
			}

			const encryptedMessage = encryptedMessageResult.value
			if (encryptedMessage.kind !== 'ENCRYPTED') return encryptedMessage.plaintext

			const fromAddress = parseAccountAddress(from)
			const publicKeyOfOtherParty = fromAddress.publicKey

			const message = await account.decrypt({ encryptedMessage, publicKeyOfOtherParty }).toPromise()

			if (!message) {
				throw new Error('Failed to decrypt message.')
			}

			return message
		},
		[radix, account],
	)

	return { createMessage, decryptMessage }
}
