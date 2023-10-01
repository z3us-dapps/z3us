import type {
	PublicKey,
	Signature,
	SignatureWithPublicKey} from '@radixdlt/radix-engine-toolkit';
import {
	Convert,
	LTSRadixEngineToolkit
} from '@radixdlt/radix-engine-toolkit'
import { useContext, useEffect, useMemo } from 'react'
import browser from 'webextension-polyfill'

import { useSharedStore } from 'ui/src/hooks/use-store'
import type { Keystore } from 'ui/src/store/types'

import type { MessageTypes as BackgroundMessageTypes } from '@src/browser/background/message-handlers'
import { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { ClientContext } from '@src/context/client-provider'
import { publicKeyFromJSON } from '@src/crypto/key_pair'
import { signatureFromJSON, signatureWithPublicKeyFromJSON } from '@src/crypto/signature'
import type { Data } from '@src/types/vault'

export const useMessageClient = () => {
	const client = useContext(ClientContext)

	const { reloadTrigger } = useSharedStore(state => ({
		reloadTrigger: state.reloadSharedStoreAction,
	}))

	const updateCursor = result => {
		reloadTrigger()
		return result
	}

	useEffect(() => {
		browser.runtime.onMessage.addListener(client.onMessage)
		return () => browser.runtime.onMessage.removeListener(client.onMessage)
	}, [client])

	return useMemo(
		() => ({
			ping: async (): Promise<boolean> =>
				client.sendMessage(BackgroundMessageAction.BACKGROUND_PING).then(updateCursor),

			getSecret: async (password: string): Promise<string | null> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_VAULT_GET, {
						password,
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_VAULT_GET])
					.then(updateCursor),
			lockVault: async (): Promise<void> =>
				client.sendMessage(BackgroundMessageAction.BACKGROUND_VAULT_LOCK).then(updateCursor),
			unlockVault: async (password: string): Promise<void> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_VAULT_UNLOCK, {
						password,
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_VAULT_UNLOCK])
					.then(updateCursor),
			storeInVault: async (keystore: Keystore, data: Data, password: string): Promise<void> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_VAULT_SAVE, {
						keystore,
						data,
						password,
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_VAULT_SAVE])
					.then(updateCursor),
			removeFromVault: async (password: string) =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_VAULT_REMOVE, {
						password,
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_VAULT_REMOVE])
					.then(updateCursor),
			isVaultUnlocked: async (): Promise<boolean> =>
				client.sendMessage(BackgroundMessageAction.BACKGROUND_VAULT_IS_UNLOCKED),

			getPublicKey: async (type: 'account' | 'persona', index: number = 0): Promise<PublicKey | null> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_GET_PUBLIC_KEY, {
						index,
						type,
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_GET_PUBLIC_KEY])
					.then(resp => publicKeyFromJSON(resp || {}))
					.then(updateCursor),
			signToSignature: async (
				type: 'account' | 'persona',
				password: string,
				data: Uint8Array,
				index: number = 0,
			): Promise<Signature | null> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE, {
						index,
						type,
						password,
						toSign: Convert.Uint8Array.toHexString(data),
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE])
					.then(resp => signatureFromJSON(resp || {}))
					.then(updateCursor),
			signToSignatureWithPublicKey: async (
				type: 'account' | 'persona',
				password: string,
				data: Uint8Array,
				index: number = 0,
			): Promise<SignatureWithPublicKey | null> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY, {
						index,
						type,
						password,
						toSign: Convert.Uint8Array.toHexString(data),
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY])
					.then(resp => signatureWithPublicKeyFromJSON(resp || {}))
					.then(updateCursor),
			signHash: async (password: string, data: Uint8Array, index: number = 0): Promise<Signature | null> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE, {
						index,
						password,
						toSign: Convert.Uint8Array.toHexString(LTSRadixEngineToolkit.Utils.hash(data)),
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE])
					.then(updateCursor),

			handleRadixMessage: async (
				message: BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_RADIX],
			): Promise<PublicKey | null> =>
				client
					.sendMessage(
						BackgroundMessageAction.BACKGROUND_RADIX,
						message as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_RADIX],
					)
					.then(updateCursor),
		}),
		[client],
	)
}
