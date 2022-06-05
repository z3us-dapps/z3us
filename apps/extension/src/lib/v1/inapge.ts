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
	async function encrypt(message: string, fromAddress: string, toAddress: string) {
		if (!message) {
			throw new Error('Empty message')
		}
		if (!toAddress) {
			throw new Error('Empty destination address')
		}
		return sendMessage(ENCRYPT, { message, fromAddress, toAddress })
	}

	async function decrypt(message: string, fromAddress: string) {
		if (!message) {
			throw new Error('Empty message')
		}
		if (!fromAddress) {
			throw new Error('Empty source address')
		}
		return sendMessage(DESCRYPT, { message, fromAddress })
	}

	async function sign(challenge: string) {
		if (!challenge) {
			throw new Error('Empty challenge')
		}
		return sendMessage(SIGN, { challenge })
	}

	async function submitTransaction({ transaction }: { transaction: any }) {
		if (!transaction) {
			throw new Error('Missing transactiond data')
		}
		return sendMessage(SEND_TRANSACTION, { transaction })
	}

	/**
	 * @deprecated Use submitTransaction() instead
	 */
	async function sendTransaction({ transaction }: { symbol: string; fromAddress: string; transaction: any }) {
		return submitTransaction(transaction)
	}

	return {
		hasWallet: () => sendMessage(HAS_WALLET, {}),
		isConnected: () => sendMessage(IS_CONNECTED, {}),
		connect: () => sendMessage(CONNECT, {}),
		disconnect: () => sendMessage(DISCONNECT, {}),
		accounts: () => sendMessage(ACCOUNTS, {}),
		balances: () => sendMessage(BALANCES, {}),
		stakes: () => sendMessage(STAKES, {}),
		unstakes: () => sendMessage(UNSTAKES, {}),
		sendTransaction,
		submitTransaction,
		encrypt,
		decrypt,
		sign,
	}
}
