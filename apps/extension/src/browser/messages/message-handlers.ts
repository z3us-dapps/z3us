import type { Message, MessageHandlers } from '@src/browser/messages/types'
import { MessageAction } from '@src/browser/messages/types'
import { Vault } from '@src/browser/vault/vault'
import type { Data } from '@src/types/vault'

const vault = new Vault(globalThis.crypto)

async function ping() {
	return true
}

async function storeInVault(message: Message): Promise<Data> {
	const { data, password } = message.payload
	return vault.save(data, password)
}

async function getFromVault(message: Message): Promise<Data> {
	const { password } = message.payload
	return vault.get(password)
}

async function removeFromVault(message: Message) {
	const { password } = message.payload
	return vault.remove(password)
}

export default {
	[MessageAction.PING]: ping,

	[MessageAction.VAULT_GET]: getFromVault,
	[MessageAction.VAULT_SAVE]: storeInVault,
	[MessageAction.VAULT_REMOVE]: removeFromVault,
} as MessageHandlers
