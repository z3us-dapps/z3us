import { useCallback } from 'react'
import { firstValueFrom } from 'rxjs'
import { Message } from '@radixdlt/crypto'
import { useSharedStore, useStore } from '@src/store'
import { useRadix } from '@src/hooks/use-radix'
import { parseAccountAddress } from '@src/services/radix/serializer'
import { AccountAddress } from '@radixdlt/account'

export const useMessage = () => {
	const radix = useRadix()
	const { isHardwareWallet, addToast } = useSharedStore(state => ({
		isHardwareWallet: state.isHardwareWallet,
		addToast: state.addToastAction,
	}))
	const { account } = useStore(state => ({
		account: state.account,
	}))

	const createMessage = useCallback(
		async (plaintext: string, recipientAddress: string = ''): Promise<string> => {
			if (!plaintext) {
				throw new Error('Invalid message')
			}
			let buffer: Buffer
			if (recipientAddress) {
				const toResult = AccountAddress.fromUnsafe(recipientAddress)
				if (toResult.isErr()) {
					throw toResult.error
				}
				if (isHardwareWallet) {
					addToast({
						type: 'success',
						title: 'Please confirm with your device',
						duration: 2000,
					})
				}
				const ecnrypted = await firstValueFrom(
					account.encrypt({
						plaintext,
						publicKeyOfOtherParty: toResult.value.publicKey,
					}),
				)
				buffer = ecnrypted.combined()
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

			if (isHardwareWallet) {
				addToast({
					type: 'success',
					title: 'Please confirm with your device',
					duration: 2000,
				})
			}
			const message = await firstValueFrom(account.decrypt({ encryptedMessage, publicKeyOfOtherParty }))

			if (!message) {
				throw new Error('Failed to decrypt message.')
			}

			return message
		},
		[radix, account],
	)

	return { createMessage, decryptMessage }
}
