import { messageLifeCycleEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import {
	type Message as RadixMessage,
	messageDiscriminator,
	messageSource as radixMessageSource,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { WalletInteractionWithOrigin } from '@radixdlt/radix-connect-schemas'
import type { PrivateKey } from '@radixdlt/radix-engine-toolkit'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import browser from 'webextension-polyfill'

import { sharedStore } from 'ui/src/store'
import { KeystoreType } from 'ui/src/store/types'
import type { CURVE, Keystore } from 'ui/src/store/types'

import { openAppPopup } from '@src/browser/app/popup'
import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { MessageAction as AppMessageAction } from '@src/browser/app/types'
import { newMessage } from '@src/browser/messages/message'
import { type Message, type MessageHandlers, MessageSource } from '@src/browser/messages/types'
import { Vault } from '@src/browser/vault/vault'
import type { PublicKeyJSON } from '@src/crypto/key_pair'
import { getPrivateKey, publicKeyToJSON } from '@src/crypto/key_pair'
import { getSecret as cryptoGetSecret, getCombineData } from '@src/crypto/secret'
import type { SignatureJSON, SignatureWithPublicKeyJSON } from '@src/crypto/signature'
import { signatureToJSON, signatureWithPublicKeyToJSON } from '@src/crypto/signature'
import { saveInteractions } from '@src/radix/interaction'
import { type Data } from '@src/types/vault'

import { MessageAction } from './types'

const vault = new Vault(globalThis.crypto)

async function ping(): Promise<boolean> {
	return true
}

async function lockVault(): Promise<void> {
	vault.lock()
}

export interface UnlockVaultMessage {
	runtimeId: string
	keystore: Keystore
	password: string
}

async function unlockVault(message: Message): Promise<void> {
	const { runtimeId, keystore, password } = message.payload as UnlockVaultMessage
	await vault.unlock(keystore, runtimeId, password)
}

export interface IsUnlockVaultMessage {
	runtimeId: string
	keystore: Keystore
}

async function isVaultUnlocked(message: Message): Promise<boolean> {
	const { runtimeId, keystore } = message.payload as IsUnlockVaultMessage

	const walletData = await vault.get(runtimeId)
	if (!walletData) {
		try {
			await vault.checkPassword(keystore, '')
			return !!(await vault.unlock(keystore, runtimeId, ''))
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
	keystore: Keystore
	password: string
}

async function removeFromVault(message: Message): Promise<void> {
	const { keystore, password } = message.payload as RemoveFromVaultMessage
	return vault.remove(keystore, password)
}

export interface GetPublicKeyMessage {
	runtimeId: string
	curve: CURVE
	derivationPath: string
	combinedKeystoreId: string
}

async function getPublicKey(message: Message): Promise<PublicKeyJSON | null> {
	const { runtimeId, curve, derivationPath, combinedKeystoreId } = message.payload as GetPublicKeyMessage
	const walletData = await vault.get(runtimeId)
	if (!walletData) {
		return null
	}

	const data = getCombineData(walletData.data, combinedKeystoreId)
	const privateKey = getPrivateKey(data, curve, derivationPath)
	if (privateKey) return publicKeyToJSON(privateKey.publicKey())

	return null
}

export interface SignMessage {
	runtimeId: string
	keystore: Keystore
	password: string
	toSign: string
	curve: CURVE
	derivationPath: string
	combinedKeystoreId: string
}

async function signToSignature(message: Message): Promise<SignatureJSON | null> {
	const { runtimeId, keystore, curve, derivationPath, password, toSign, combinedKeystoreId } =
		message.payload as SignMessage
	const walletData = await vault.get(runtimeId)
	if (!walletData) {
		return null
	}

	await vault.checkPassword(keystore, password)

	const data = getCombineData(walletData.data, combinedKeystoreId)
	const privateKey: PrivateKey = getPrivateKey(data, curve, derivationPath)
	const signature = privateKey.signToSignature(Convert.HexString.toUint8Array(toSign))
	return signatureToJSON(signature)
}

async function signToSignatureWithPublicKey(message: Message): Promise<SignatureWithPublicKeyJSON | null> {
	const { runtimeId, keystore, curve, derivationPath, password, toSign, combinedKeystoreId } =
		message.payload as SignMessage
	const walletData = await vault.get(runtimeId)
	if (!walletData) {
		return null
	}

	await vault.checkPassword(keystore, password)

	const data = getCombineData(walletData.data, combinedKeystoreId)
	const privateKey: PrivateKey = getPrivateKey(data, curve, derivationPath)
	const signature = privateKey.signToSignatureWithPublicKey(Convert.HexString.toUint8Array(toSign))
	return signatureWithPublicKeyToJSON(signature, privateKey.publicKeyBytes())
}

export interface GetSecretMessage {
	runtimeId: string
	keystore: Keystore
	password: string
	combinedKeystoreId: string
}

async function getSecret(message: Message): Promise<string> {
	const { runtimeId, keystore, password, combinedKeystoreId } = message.payload as GetSecretMessage
	const walletData = await vault.get(runtimeId)
	if (!walletData) {
		return null
	}

	await vault.checkPassword(keystore, password)

	const data = getCombineData(walletData.data, combinedKeystoreId)
	return cryptoGetSecret(data)
}

export interface GetDataMessage {
	runtimeId: string
	keystore: Keystore
	password: string
}

async function getData(message: Message): Promise<Data> {
	const { runtimeId, keystore, password } = message.payload as GetDataMessage
	const walletData = await vault.get(runtimeId)
	if (!walletData) {
		return null
	}

	await vault.checkPassword(keystore, password)

	return walletData.data
}

async function handleRadixMessage(message: Message) {
	await sharedStore.persist.rehydrate()
	const sharedState = sharedStore.getState()

	const keystore = sharedState.keystores.find(k => k.id === sharedState.selectedKeystoreId)
	if (!keystore) throw Error(`Missing keystore: ${sharedState.selectedKeystoreId}`)
	if (keystore.type === KeystoreType.RADIX_WALLET) return null

	const radixMsg = message.payload as RadixMessage

	switch (radixMsg?.discriminator) {
		case messageDiscriminator.sendMessageEventToDapp:
			return createRadixMessage.sendMessageEventToDapp(
				radixMessageSource.contentScript,
				radixMsg.messageEvent,
				radixMsg.data,
			)
		case messageDiscriminator.walletResponse:
			return radixMsg.data
		case messageDiscriminator.dAppRequest: {
			try {
				const walletInteraction: WalletInteractionWithOrigin = radixMsg.data
				const { interactionId, metadata, items } = walletInteraction
				if (items) {
					switch (items.discriminator) {
						case 'cancelRequest':
							browser.runtime
								.sendMessage(
									newMessage(
										AppMessageAction.APP_INTERACTION_CANCEL,
										MessageSource.BACKGROUND,
										MessageSource.POPUP,
										radixMsg.data,
									),
								)
								// eslint-disable-next-line no-console
								.catch(console.error)
							break
						default:
							saveInteractions({
								...walletInteraction,
								fromTabId: message.fromTabId,
								senderURl: message.senderUrl,
							} as WalletInteractionWithTabId)
								.then(() => openAppPopup(`#/interaction/${interactionId}`))
								// eslint-disable-next-line no-console
								.catch(console.error)
							break
					}
				}

				return createRadixMessage.sendMessageEventToDapp(
					radixMessageSource.contentScript,
					messageLifeCycleEvent.receivedByExtension,
					{ interactionId, metadata },
				)
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(`⚡️Z3US⚡️: background handleRadixMessage: ${radixMsg?.discriminator}`, radixMsg, error)
				return createRadixMessage.confirmationError(radixMessageSource.contentScript, radixMsg.messageId, {
					reason: 'failedToDetectWalletLink',
					jsError: error,
				})
			}
		}
		default:
			// eslint-disable-next-line no-console
			console.error(`⚡️Z3US⚡️: background handleRadixMessage: ${radixMsg?.discriminator}`, radixMsg, message)
			if (radixMsg?.messageId) {
				return createRadixMessage.confirmationError(radixMessageSource.contentScript, radixMsg.messageId, {
					reason: 'unhandledMessageDiscriminator',
				})
			}
			return null
	}
}

export type MessageTypes = {
	[MessageAction.BACKGROUND_PING]: undefined

	[MessageAction.BACKGROUND_VAULT_LOCK]: undefined
	[MessageAction.BACKGROUND_VAULT_UNLOCK]: UnlockVaultMessage
	[MessageAction.BACKGROUND_VAULT_SAVE]: StoreInVaultMessage
	[MessageAction.BACKGROUND_VAULT_REMOVE]: RemoveFromVaultMessage
	[MessageAction.BACKGROUND_VAULT_IS_UNLOCKED]: IsUnlockVaultMessage
	[MessageAction.BACKGROUND_VAULT_GET]: GetSecretMessage
	[MessageAction.BACKGROUND_VAULT_GET_DATA]: GetDataMessage

	[MessageAction.BACKGROUND_GET_PUBLIC_KEY]: GetPublicKeyMessage
	[MessageAction.BACKGROUND_SIGN_TO_SIGNATURE]: SignMessage
	[MessageAction.BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY]: SignMessage

	[MessageAction.BACKGROUND_RADIX]: RadixMessage
}

export default {
	[MessageAction.BACKGROUND_PING]: ping,

	[MessageAction.BACKGROUND_VAULT_LOCK]: lockVault,
	[MessageAction.BACKGROUND_VAULT_UNLOCK]: unlockVault,
	[MessageAction.BACKGROUND_VAULT_SAVE]: storeInVault,
	[MessageAction.BACKGROUND_VAULT_REMOVE]: removeFromVault,
	[MessageAction.BACKGROUND_VAULT_IS_UNLOCKED]: isVaultUnlocked,
	[MessageAction.BACKGROUND_VAULT_GET]: getSecret,
	[MessageAction.BACKGROUND_VAULT_GET_DATA]: getData,

	[MessageAction.BACKGROUND_GET_PUBLIC_KEY]: getPublicKey,
	[MessageAction.BACKGROUND_SIGN_TO_SIGNATURE]: signToSignature,
	[MessageAction.BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY]: signToSignatureWithPublicKey,

	[MessageAction.BACKGROUND_RADIX]: handleRadixMessage,
} as MessageHandlers
