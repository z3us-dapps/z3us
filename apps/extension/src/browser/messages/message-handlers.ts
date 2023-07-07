import type { Message, MessageHandlers } from '@src/browser/messages/types'
import { MessageAction } from '@src/browser/messages/types'
import { Vault } from '@src/browser/vault/vault'
import { getPublicKey as cryptoGetPublicKey } from '@src/crypto/key_pair'
import type { Data } from '@src/types/vault'

const vault = new Vault(globalThis.crypto)

async function ping() {
	return true
}

async function storeInVault(message: Message): Promise<Data> {
	const { keystore, data, password } = message.payload
	return vault.save(keystore, data, password)
}

async function getFromVault(message: Message): Promise<Data> {
	const { password } = message.payload
	return vault.get(password)
}

async function removeFromVault(message: Message) {
	const { password } = message.payload
	return vault.remove(password)
}

async function getPublicKey() {
	const walletData = await vault.getWalletData()
	if (!walletData) {
		return null
	}
	const publicKey = cryptoGetPublicKey(walletData.data)
	return publicKey
}

export default {
	[MessageAction.PING]: ping,

	[MessageAction.VAULT_GET]: getFromVault,
	[MessageAction.VAULT_SAVE]: storeInVault,
	[MessageAction.VAULT_REMOVE]: removeFromVault,

	[MessageAction.GET_PUBLIC_KEY]: getPublicKey,
} as MessageHandlers
