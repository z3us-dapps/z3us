import { MessageResponse } from '@src/services/messanger'
import {
	HAS_WALLET,
	IS_CONNECTED,
	CONNECT,
	DISCONNECT,
	SEND_TRANSACTION,
	SIGN,
	ACCOUNTS,
	BALANCES,
	STAKES,
	UNSTAKES,
	ENCRYPT,
	DESCRYPT,
} from '../actions'

export default function NewPublicV1(sendMessage: (action: string, payload?: any) => Promise<MessageResponse>) {
	async function encrypt(message: string, fromAddress: string, toAddress: string): Promise<string> {
		if (!message) {
			throw new Error('Empty message')
		}
		if (!toAddress) {
			throw new Error('Empty destination address')
		}
		return sendMessage(ENCRYPT, { message, fromAddress, toAddress })
	}

	async function decrypt(message: string, fromAddress: string): Promise<string> {
		if (!message) {
			throw new Error('Empty message')
		}
		if (!fromAddress) {
			throw new Error('Empty source address')
		}
		return sendMessage(DESCRYPT, { message, fromAddress })
	}

	async function sign(challenge: string): Promise<string> {
		if (!challenge) {
			throw new Error('Empty challenge')
		}
		return sendMessage(SIGN, { challenge })
	}

	async function submitTransaction({ transaction }: { transaction: any }): Promise<unknown> {
		if (!transaction) {
			throw new Error('Missing transactiond data')
		}
		return sendMessage(SEND_TRANSACTION, { transaction })
	}

	/**
	 * @deprecated Use submitTransaction() instead
	 */
	async function sendTransaction({
		transaction,
	}: {
		symbol: string
		fromAddress: string
		transaction: any
	}): Promise<unknown> {
		return submitTransaction(transaction)
	}

	return {
		hasWallet: (): Promise<boolean> => sendMessage(HAS_WALLET, {}),
		isConnected: (): Promise<boolean> => sendMessage(IS_CONNECTED, {}),
		connect: (): Promise<string> => sendMessage(CONNECT, {}),
		disconnect: (): Promise<void> => sendMessage(DISCONNECT, {}),
		sign,
		submitTransaction,

		accounts: (): Promise<string[]> => sendMessage(ACCOUNTS, {}),
		balances: (): Promise<unknown> => sendMessage(BALANCES, {}),
		stakes: (): Promise<unknown> => sendMessage(STAKES, {}),
		unstakes: (): Promise<unknown> => sendMessage(UNSTAKES, {}),
		encrypt,
		decrypt,
		sendTransaction,
	}
}
