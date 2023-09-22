import {
	type Message as RadixMessage,
	messageDiscriminator,
	messageSource as radixMessageSource,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { Account, Persona } from '@radixdlt/radix-dapp-toolkit'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import browser from 'webextension-polyfill'

import { sharedStore } from 'ui/src/store'
import type { AddressBook, AddressIndexes, Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

import { openAppPopup } from '@src/browser/app/popup'
import type { Message, MessageHandlers, OlympiaAddressDetails } from '@src/browser/messages/types'
import { MessageAction } from '@src/browser/messages/types'
import { Vault } from '@src/browser/vault/vault'
import { getPublicKey as cryptoGetPublicKey, getPrivateKey } from '@src/crypto/key_pair'
import { getSecret as cryptoGetSecret } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'

import { deriveAccounts, deriveOlympiaAddresses, derivePersonas } from './radix-address'

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
	await vault.unlock(password)
}

async function isVaultUnlocked(): Promise<boolean> {
	const walletData = await vault.get()
	if (!walletData) {
		try {
			return !!(await vault.unlock(''))
		} catch (error) {
			return false
		}
	}
	return !!walletData
}

export interface StoreInVaultMessage {
	keystore: Keystore
	data: Data
	password: string
}

async function storeInVault(message: Message): Promise<void> {
	const { keystore, data, password } = message.payload as StoreInVaultMessage
	await vault.save(keystore, data, password)
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

async function signToSignature(message: Message) {
	const { index, password, toSign } = message.payload as SignMessage
	const walletData = await vault.unlock(password)
	if (!walletData) {
		return null
	}
	const privateKey = getPrivateKey(walletData.data, index)
	return privateKey.signToSignature(Convert.HexString.toUint8Array(toSign))
}

async function signToSignatureWithPublicKey(message: Message) {
	const { index, password, toSign } = message.payload as SignMessage
	const walletData = await vault.unlock(password)
	if (!walletData) {
		return null
	}
	const privateKey = getPrivateKey(walletData.data, index)
	return privateKey.signToSignatureWithPublicKey(Convert.HexString.toUint8Array(toSign))
}

export interface GetSecretMessage {
	password: string
}

async function getSecret(message: Message) {
	const { password } = message.payload as GetSecretMessage
	const walletData = await vault.unlock(password)
	if (!walletData) {
		return null
	}
	return cryptoGetSecret(walletData.data)
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

export interface GetPersonasMessage {
	networkId: number
	indexes: AddressIndexes
}

async function getPersonas(message: Message): Promise<Persona[]> {
	const { networkId, indexes } = message.payload as GetPersonasMessage
	const walletData = await vault.get()
	if (!walletData) {
		return []
	}

	const personas = await derivePersonas(getPublicKey, indexes, networkId)
	return personas
}

export interface GetAccountsMessage {
	networkId: number
	indexes: AddressIndexes
	addressBook: AddressBook
}

async function getAccounts(message: Message): Promise<Account[]> {
	const { networkId, indexes, addressBook } = message.payload as GetAccountsMessage
	const walletData = await vault.get()
	if (!walletData) {
		return []
	}

	const accounts = await deriveAccounts(getPublicKey, addressBook, indexes, networkId)
	return accounts
}

export interface GetOlympiaAddressesMessage {
	indexes: AddressIndexes
	addressBook: AddressBook
}

async function getOlympiaAddresses(message: Message): Promise<OlympiaAddressDetails[]> {
	const { indexes, addressBook } = message.payload as GetOlympiaAddressesMessage
	const walletData = await vault.get()
	if (!walletData) {
		return []
	}

	const addresses = await deriveOlympiaAddresses(getPublicKey, addressBook, indexes)
	return addresses
}

async function handleRadixMessage(message: Message) {
	await sharedStore.persist.rehydrate()
	const sharedState = sharedStore.getState()

	const keystore = sharedState.keystores.find(k => k.id === sharedState.selectedKeystoreId)
	if (!keystore) throw Error(`Missing keystore: ${sharedState.selectedKeystoreId}`)
	if (keystore.type === KeystoreType.RADIX_WALLET) return null

	const radixMsg = message.payload as RadixMessage

	console.error(`⚡️Z3US⚡️: background handleRadixMessage: ${radixMsg?.discriminator}`, radixMsg)

	switch (radixMsg?.discriminator) {
		case messageDiscriminator.incomingDappMessage: {
			switch (radixMsg?.data?.discriminator) {
				case messageDiscriminator.extensionStatus:
					return createRadixMessage.extensionStatus(true)
				case messageDiscriminator.openParingPopup:
					try {
						await openAppPopup()
						return null
					} catch (error) {
						console.error(`⚡️Z3US⚡️: background handleRadixMessage: ${radixMsg?.discriminator}`, radixMsg, error)
						return createRadixMessage.confirmationError(radixMessageSource.contentScript, radixMsg.messageId, {
							reason: 'unableToOpenParingPopup',
						})
					}
				default:
					try {
						const { interactionId, items } = radixMsg.data
						await browser.runtime.sendMessage(
							createRadixMessage.sendMessageEventToDapp(
								radixMessageSource.contentScript,
								'receivedByExtension',
								interactionId,
							),
						)

						await browser.runtime.sendMessage(
							createRadixMessage.sendMessageEventToDapp(
								radixMessageSource.offScreen,
								'receivedByWallet',
								interactionId,
							),
						)

						// const publicKey = await getPublicKey(
						// 	newMessage(MessageAction.GET_PUBLIC_KEY, MessageSource.BACKGROUND, MessageSource.BACKGROUND, {
						// 		index: 0,
						// 	} as GetPublicKeyMessage),
						// )
						// if (!publicKey) {
						// 	await browser.runtime.sendMessage(
						// 		createRadixMessage.walletResponse(radixMessageSource.offScreen, {
						// 			discriminator: 'success',
						// 			items: createRadixMessage.sendMessageToTab,
						// 			interactionId,
						// 		}),
						// 	)
						// 	return null
						// }

						// below are example payloads we need to return

						// https://github.com/radixdlt/wallet-sdk/blob/c4a8433a2b2357c4d28dcf36fe2810f0d5fe158e/lib/__tests__/wallet-sdk.spec.ts#L93
						console.info('items', interactionId, items) // @TODO: handle specifically using popup or such

						await browser.runtime.sendMessage(
							createRadixMessage.walletResponse(radixMessageSource.offScreen, {
								discriminator: 'success',
								items: {
									discriminator: 'authorizedRequest',
									auth: {
										discriminator: 'loginWithoutChallenge',
										persona: {},
									},
									ongoingAccounts: {
										accounts: [],
									},
								},
								interactionId,
							}),
						)

						return null
					} catch (error) {
						console.error(`⚡️Z3US⚡️: background handleRadixMessage: ${radixMsg?.discriminator}`, radixMsg, error)
						return createRadixMessage.confirmationError(radixMessageSource.contentScript, radixMsg.messageId, {
							reason: 'failedToDetectWalletLink',
						})
					}
			}
		}
		default:
			return createRadixMessage.confirmationError(radixMessageSource.contentScript, radixMsg.messageId, {
				reason: 'unhandledMessageDiscriminator',
			})
	}
}

export type MessageTypes = {
	[MessageAction.PING]: undefined

	[MessageAction.VAULT_GET]: GetSecretMessage
	[MessageAction.VAULT_LOCK]: undefined
	[MessageAction.VAULT_UNLOCK]: UnlockVaultMessage
	[MessageAction.VAULT_SAVE]: StoreInVaultMessage
	[MessageAction.VAULT_REMOVE]: RemoveFromVaultMessage
	[MessageAction.VAULT_IS_UNLOCKED]: undefined

	[MessageAction.GET_PUBLIC_KEY]: GetPublicKeyMessage
	[MessageAction.SIGN_TO_SIGNATURE]: SignMessage
	[MessageAction.SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY]: SignMessage

	[MessageAction.GET_PERSONAS]: GetPersonasMessage
	[MessageAction.GET_ACCOUNTS]: GetAccountsMessage
	[MessageAction.GET_OLYMPIA_ADDRESSES]: GetOlympiaAddressesMessage

	[MessageAction.RADIX]: RadixMessage
}

export default {
	[MessageAction.PING]: ping,

	[MessageAction.VAULT_LOCK]: lockVault,
	[MessageAction.VAULT_UNLOCK]: unlockVault,
	[MessageAction.VAULT_SAVE]: storeInVault,
	[MessageAction.VAULT_REMOVE]: removeFromVault,
	[MessageAction.VAULT_IS_UNLOCKED]: isVaultUnlocked,
	[MessageAction.VAULT_GET]: getSecret,

	[MessageAction.GET_PUBLIC_KEY]: getPublicKey,
	[MessageAction.SIGN_TO_SIGNATURE]: signToSignature,
	[MessageAction.SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY]: signToSignatureWithPublicKey,

	[MessageAction.GET_PERSONAS]: getPersonas,
	[MessageAction.GET_ACCOUNTS]: getAccounts,
	[MessageAction.GET_OLYMPIA_ADDRESSES]: getOlympiaAddresses,

	[MessageAction.RADIX]: handleRadixMessage,
} as MessageHandlers
