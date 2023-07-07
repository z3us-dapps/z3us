import type { Message, MessageHandlers } from '@src/browser/messages/types'
import { MessageAction } from '@src/browser/messages/types'
import { Vault } from '@src/browser/vault/vault'
import { getPublicKey as cryptoGetPublicKey, getPrivateKey } from '@src/crypto/key_pair'

const vault = new Vault(globalThis.crypto)

async function ping() {
	return true
}

async function unlockVault(message: Message): Promise<void> {
	const { password } = message.payload
	vault.unlock(password)
}

async function storeInVault(message: Message): Promise<void> {
	const { keystore, data, password } = message.payload
	vault.save(keystore, data, password)
}

async function removeFromVault(message: Message) {
	const { password } = message.payload
	return vault.remove(password)
}

async function sign(message: Message) {
	const { password, hashToSign } = message.payload
	const walletData = await vault.unlock(password)
	if (!walletData) {
		return null
	}
	const privateKey = getPrivateKey(walletData.data)

	return privateKey.signToSignature(hashToSign)
}

async function getPublicKey() {
	const walletData = await vault.get()
	if (!walletData) {
		return null
	}
	const publicKey = cryptoGetPublicKey(walletData.data)
	return publicKey
}

export default {
	[MessageAction.PING]: ping,

	[MessageAction.VAULT_UNLOCK]: unlockVault,
	[MessageAction.VAULT_SAVE]: storeInVault,
	[MessageAction.VAULT_REMOVE]: removeFromVault,

	[MessageAction.SIGN]: sign,
	[MessageAction.GET_PUBLIC_KEY]: getPublicKey,
} as MessageHandlers
