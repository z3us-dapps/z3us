import type { PublicKey, Signature } from '@radixdlt/radix-engine-toolkit'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import { useCallback, useContext, useMemo } from 'react'

import { useSharedStore } from 'ui/src/hooks/use-store'
import type { CURVE, Keystore } from 'ui/src/store/types'

import type { MessageTypes as BackgroundMessageTypes } from '@src/browser/background/message-handlers'
import { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { ClientContext } from '@src/context/message-client-provider'
import { Context as RuntimeIdContext } from '@src/context/runtime-id-provider'
import { publicKeyFromJSON } from '@src/crypto/key_pair'
import type { SignatureWithPublicKeyJSON } from '@src/crypto/signature'
import { signatureFromJSON } from '@src/crypto/signature'
import type { Data } from '@src/types/vault'

export const useMessageClient = () => {
	const client = useContext(ClientContext)
	const runtimeId = useContext(RuntimeIdContext)

	const { reloadTrigger } = useSharedStore(state => ({
		reloadTrigger: state.reloadSharedStoreAction,
	}))

	const sendMessageToBackground = useCallback(
		(action: BackgroundMessageAction, payload: BackgroundMessageTypes[keyof BackgroundMessageTypes] = {}) =>
			client.sendMessage(action, { runtimeId, ...payload } as BackgroundMessageTypes[typeof action]),
		[runtimeId, client],
	)

	const sendMessageToBackgroundAndUpdateTrigger = useCallback(
		async (action: BackgroundMessageAction, payload: BackgroundMessageTypes[keyof BackgroundMessageTypes] = {}) => {
			const response = await client.sendMessage(action, {
				runtimeId,
				...payload,
			} as BackgroundMessageTypes[typeof action])
			reloadTrigger()
			return response
		},
		[runtimeId, client, reloadTrigger],
	)

	return useMemo(
		() => ({
			ping: (): Promise<boolean> => sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_PING),

			getSecret: (keystore: Keystore, combinedKeystoreId: string, password: string): Promise<string | null> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_GET, {
					keystore,
					password,
					combinedKeystoreId,
				}),
			getData: (keystore: Keystore, password: string): Promise<Data> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_GET_DATA, {
					keystore,
					password,
				}),

			lockVault: (): Promise<void> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_LOCK),
			unlockVault: (keystore: Keystore, password: string): Promise<void> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_UNLOCK, {
					keystore,
					password,
				}),
			storeInVault: (keystore: Keystore, data: Data, password: string): Promise<void> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_SAVE, {
					keystore,
					data,
					password,
				}),
			removeFromVault: (keystore: Keystore, password: string) =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_REMOVE, {
					keystore,
					password,
				}),
			isVaultUnlocked: (keystore: Keystore): Promise<boolean> =>
				sendMessageToBackground(BackgroundMessageAction.BACKGROUND_VAULT_IS_UNLOCKED, { keystore }),

			getPublicKey: (
				keystore: Keystore,
				curve: CURVE,
				derivationPath: string,
				combinedKeystoreId: string,
			): Promise<PublicKey | null> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_GET_PUBLIC_KEY, {
					keystore,
					curve,
					derivationPath,
					combinedKeystoreId,
				}).then(resp => publicKeyFromJSON(resp || {})),

			signToSignature: (
				keystore: Keystore,
				curve: CURVE,
				derivationPath: string,
				password: string,
				data: Uint8Array,
				combinedKeystoreId: string,
			): Promise<Signature | null> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE, {
					keystore,
					curve,
					derivationPath,
					password,
					toSign: Convert.Uint8Array.toHexString(data),
					combinedKeystoreId,
				}).then(resp => signatureFromJSON(resp || {})),
			signToSignatureWithPublicKey: (
				keystore: Keystore,
				curve: CURVE,
				derivationPath: string,
				password: string,
				data: Uint8Array,
				combinedKeystoreId: string,
			): Promise<SignatureWithPublicKeyJSON | null> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY, {
					keystore,
					curve,
					derivationPath,
					password,
					toSign: Convert.Uint8Array.toHexString(data),
					combinedKeystoreId,
				}),
		}),
		[sendMessageToBackgroundAndUpdateTrigger, sendMessageToBackground],
	)
}
