import { messageLifeCycleEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import {
	type Message as RadixMessage,
	messageDiscriminator,
	messageSource as radixMessageSource,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { WalletInteraction } from '@radixdlt/radix-dapp-toolkit'
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
import { getSecret as cryptoGetSecret } from '@src/crypto/secret'
import type { SignatureJSON, SignatureWithPublicKeyJSON } from '@src/crypto/signature'
import { signatureToJSON, signatureWithPublicKeyToJSON } from '@src/crypto/signature'
import { saveInteractions } from '@src/radix/interaction'
import type { Data } from '@src/types/vault'

import { MessageAction } from './types'

const vault = new Vault(globalThis.crypto)

async function ping(): Promise<boolean> {
	return true
}

async function lockVault(): Promise<void> {
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
			await vault.checkPassword('')
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

async function removeFromVault(message: Message): Promise<void> {
	const { password } = message.payload as RemoveFromVaultMessage
	return vault.remove(password)
}

export interface GetPublicKeyMessage {
	curve: CURVE
	derivationPath: string
}

async function getPublicKey(message: Message): Promise<PublicKeyJSON | null> {
	const { curve, derivationPath } = message.payload as GetPublicKeyMessage
	const walletData = await vault.get()
	if (!walletData) {
		return null
	}

	const privateKey = getPrivateKey(walletData.data, curve, derivationPath)
	if (privateKey) return publicKeyToJSON(privateKey.publicKey())

	return null
}

export interface SignMessage {
	password: string
	toSign: string
	curve: CURVE
	derivationPath: string
}

async function signToSignature(message: Message): Promise<SignatureJSON | null> {
	const { curve, derivationPath, password, toSign } = message.payload as SignMessage
	const walletData = await vault.get()
	if (!walletData) {
		return null
	}

	await vault.checkPassword(password)

	const privateKey: PrivateKey = getPrivateKey(walletData.data, curve, derivationPath)
	const signature = privateKey.signToSignature(Convert.HexString.toUint8Array(toSign))
	return signatureToJSON(signature)
}

async function signToSignatureWithPublicKey(message: Message): Promise<SignatureWithPublicKeyJSON | null> {
	const { curve, derivationPath, password, toSign } = message.payload as SignMessage
	const walletData = await vault.get()
	if (!walletData) {
		return null
	}

	await vault.checkPassword(password)

	const privateKey: PrivateKey = getPrivateKey(walletData.data, curve, derivationPath)
	const signature = privateKey.signToSignatureWithPublicKey(Convert.HexString.toUint8Array(toSign))
	return signatureWithPublicKeyToJSON(signature)
}

export interface GetSecretMessage {
	password: string
}

async function getSecret(message: Message): Promise<string> {
	const { password } = message.payload as GetSecretMessage
	const walletData = await vault.get()
	if (!walletData) {
		return null
	}

	await vault.checkPassword(password)

	return cryptoGetSecret(walletData.data)
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
				radixMsg.interactionId,
			)
		case messageDiscriminator.walletResponse:
			return radixMsg.data
		case messageDiscriminator.incomingDappMessage: {
			switch (radixMsg?.data?.discriminator) {
				case messageDiscriminator.extensionStatus:
					return createRadixMessage.extensionStatus(true)
				case messageDiscriminator.openParingPopup:
					try {
						await openAppPopup('#/keystore/new/radix')
						return null
					} catch (error) {
						return createRadixMessage.confirmationError(radixMessageSource.contentScript, radixMsg.messageId, {
							reason: 'unableToOpenParingPopup',
							jsError: error,
						})
					}
				default:
					try {
						const { interactionId, items } = radixMsg.data as WalletInteraction

						if (items) {
							switch (items.discriminator) {
								case 'cancelRequest':
									browser.runtime.sendMessage(
										newMessage(
											AppMessageAction.APP_INTERACTION_CANCEL,
											MessageSource.BACKGROUND,
											MessageSource.POPUP,
											radixMsg.data,
										),
									)
									break
								default:
									saveInteractions({
										...radixMsg.data,
										metadata: {
											...(radixMsg.metadata || {}),
											...(radixMsg.data?.metadata || {}),
										},
										fromTabId: message.fromTabId,
									} as WalletInteractionWithTabId).then(() => openAppPopup(`#/interaction/${interactionId}`))
									break
							}
						}

						return createRadixMessage.sendMessageEventToDapp(
							radixMessageSource.contentScript,
							messageLifeCycleEvent.receivedByExtension,
							interactionId,
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
	[MessageAction.BACKGROUND_VAULT_IS_UNLOCKED]: undefined
	[MessageAction.BACKGROUND_VAULT_GET]: GetSecretMessage

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

	[MessageAction.BACKGROUND_GET_PUBLIC_KEY]: getPublicKey,
	[MessageAction.BACKGROUND_SIGN_TO_SIGNATURE]: signToSignature,
	[MessageAction.BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY]: signToSignatureWithPublicKey,

	[MessageAction.BACKGROUND_RADIX]: handleRadixMessage,
} as MessageHandlers
