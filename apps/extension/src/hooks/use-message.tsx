import { useCallback } from 'react'
import { Message } from '@radixdlt/crypto'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
import { useRadix } from '@src/hooks/use-radix'
import { parseAccountAddress } from '@src/services/radix/serializer'

export const useMessage = () => {
	const radix = useRadix()
	const { addConfirmWithHWToast } = useSharedStore(state => ({
		addConfirmWithHWToast: state.addConfirmWithHWToastAction,
	}))
	const { signingKey } = useAccountStore(state => ({
		signingKey: state.signingKey,
	}))

	const createMessage = useCallback(
		async (plaintext: string, recipientAddress: string = ''): Promise<string> => {
			if (!plaintext) {
				throw new Error('Invalid message')
			}
			if (recipientAddress) {
				const toAddress = parseAccountAddress(recipientAddress)

				addConfirmWithHWToast()

				const ecnrypted = await signingKey.encrypt({
					plaintext,
					publicKeyOfOtherParty: toAddress.publicKey,
				})
				return ecnrypted
			}

			const plain = Message.createPlaintext(plaintext)
			return plain.bytes.toString('hex')
		},
		[signingKey.id],
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

			addConfirmWithHWToast()

			const message = await signingKey.decrypt({ encryptedMessage, publicKeyOfOtherParty })

			if (!message) {
				throw new Error('Failed to decrypt message.')
			}

			return message
		},
		[radix, signingKey.id],
	)

	return { createMessage, decryptMessage }
}
