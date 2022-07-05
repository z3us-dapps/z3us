import { firstValueFrom } from 'rxjs'
import { AccountT, AccountAddressT, AccountAddress } from '@radixdlt/application'
import { EncryptedMessageT, Message, PlaintextMessageT } from '@radixdlt/crypto'

export const createPlaintextMessage = async (plaintext: string): Promise<PlaintextMessageT> =>
	Message.createPlaintext(plaintext)

export const createEncryptedMessage = async (
	plaintext: string,
	account: AccountT,
	to: AccountAddressT,
): Promise<EncryptedMessageT> =>
	firstValueFrom(
		account.encrypt({
			plaintext,
			publicKeyOfOtherParty: to.publicKey,
		}),
	)

const decryptMessage = async (
	encryptedMessage: Buffer | EncryptedMessageT,
	account: AccountT,
	from: AccountAddressT,
): Promise<string> => firstValueFrom(account.decrypt({ encryptedMessage, publicKeyOfOtherParty: from.publicKey }))

export const EncryptMessage = async (account: AccountT, to: string, message: string) => {
	const toResult = AccountAddress.fromUnsafe(to)
	if (toResult.isErr()) {
		throw toResult.error
	}
	const ecnrypted = await createEncryptedMessage(message, account, toResult.value)

	return ecnrypted.combined()
}

export const DecryptMessage = async (account: AccountT, from: string, message: string) => {
	const fromResult = AccountAddress.fromUnsafe(from)
	if (fromResult.isErr()) {
		throw fromResult.error
	}

	const messageBuffer = Buffer.from(message, 'hex')
	const encryptedMessageResult = Message.fromBuffer(messageBuffer)
	if (!encryptedMessageResult.isOk()) {
		return message
	}

	const encryptedMessage = encryptedMessageResult.value
	if (encryptedMessage.kind !== 'ENCRYPTED') return encryptedMessage.plaintext

	return decryptMessage(encryptedMessage, account, fromResult.value)
}
