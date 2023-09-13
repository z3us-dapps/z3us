import type { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import { sharedStore } from 'packages/ui/src/store'
import type { Keystore } from 'packages/ui/src/store/types'
import { KeystoreType } from 'packages/ui/src/store/types'

import type { Message, MessageHandlers } from '@src/browser/messages/types'
import { MessageAction } from '@src/browser/messages/types'
import { Vault } from '@src/browser/vault/vault'
import { getPublicKey as cryptoGetPublicKey, getPrivateKey } from '@src/crypto/key_pair'
import type { Data } from '@src/types/vault'

const vault = new Vault(globalThis.crypto)

async function ping() {
	return true
}

async function lockVault() {
	vault.lock()
}

export interface UnlockVaultMessage {
	password: string
}

async function unlockVault(message: Message): Promise<void> {
	const { password } = message.payload as UnlockVaultMessage
	vault.unlock(password)
}

export interface StoreInVaultMessage {
	keystore: Keystore
	data: Data
	password: string
}

async function storeInVault(message: Message): Promise<void> {
	const { keystore, data, password } = message.payload as StoreInVaultMessage
	vault.save(keystore, data, password)
}

export interface RemoveFromVaultMessage {
	password: string
}

async function removeFromVault(message: Message) {
	const { password } = message.payload as RemoveFromVaultMessage
	return vault.remove(password)
}

export interface SignMessage {
	index: number
	password: string
	toSign: string
}

async function sign(message: Message) {
	const { index, password, toSign } = message.payload as SignMessage
	const walletData = await vault.unlock(password)
	if (!walletData) {
		return null
	}
	const privateKey = getPrivateKey(walletData.data, index)
	return privateKey.signToSignature(Convert.HexString.toUint8Array(toSign))
}

export interface GetPublicKeyMessage {
	index: number
}

async function getPublicKey(message: Message) {
	const { index } = message.payload as GetPublicKeyMessage
	const walletData = await vault.get()
	if (!walletData) {
		return null
	}
	const publicKey = cryptoGetPublicKey(walletData.data, index)
	return publicKey
}

async function handleRadixMessage(message: Message) {
	await sharedStore.persist.rehydrate()
	const sharedState = sharedStore.getState()

	const keystore = sharedState.keystores.find(k => k.id === sharedState.selectedKeystoreId)
	if (!keystore) throw Error(`Missing keystore: ${sharedState.selectedKeystoreId}`)
	if (keystore.type === KeystoreType.RADIX_WALLET) return

	const radixMsg = message.payload as RadixMessage

	console.error(
		`⚡️Z3US⚡️: from: ${message.source}: ${radixMsg?.discriminator} @TODO: handle radix message for none mobile wallets`,
		radixMsg,
	)
}

export type MessageTypes = {
	[MessageAction.PING]: undefined

	[MessageAction.VAULT_LOCK]: undefined
	[MessageAction.VAULT_UNLOCK]: UnlockVaultMessage
	[MessageAction.VAULT_SAVE]: StoreInVaultMessage
	[MessageAction.VAULT_REMOVE]: RemoveFromVaultMessage

	[MessageAction.SIGN]: SignMessage
	[MessageAction.GET_PUBLIC_KEY]: GetPublicKeyMessage

	[MessageAction.RADIX]: RadixMessage
}

export default {
	[MessageAction.PING]: ping,

	[MessageAction.VAULT_LOCK]: lockVault,
	[MessageAction.VAULT_UNLOCK]: unlockVault,
	[MessageAction.VAULT_SAVE]: storeInVault,
	[MessageAction.VAULT_REMOVE]: removeFromVault,

	[MessageAction.SIGN]: sign,
	[MessageAction.GET_PUBLIC_KEY]: getPublicKey,

	[MessageAction.RADIX]: handleRadixMessage,
} as MessageHandlers
