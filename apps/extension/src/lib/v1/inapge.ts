import { MessageResponse } from '@src/services/messanger'
import {
	HAS_WALLET,
	IS_CONNECTED,
	CONNECT,
	DISCONNECT,
	ACCOUNTS,
	BALANCES,
	STAKES,
	UNSTAKES,
	ENCRYPT,
	DESCRYPT,
	SEND_TRANSACTION,
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

	async function sendTransaction({
		symbol,
		fromAddress,
		transaction,
	}: {
		symbol: string
		fromAddress: string
		transaction: any
	}) {
		if (!symbol) {
			throw new Error('Invalid symbol')
		}
		if (!transaction) {
			throw new Error('Missing transactiond data')
		}
		return sendMessage(SEND_TRANSACTION, { symbol, fromAddress, transaction })
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
		encrypt,
		decrypt,
		sendTransaction,
	}
}
