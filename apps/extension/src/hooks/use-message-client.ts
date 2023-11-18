import type { PublicKey, Signature, SignatureWithPublicKey } from '@radixdlt/radix-engine-toolkit'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import { useCallback, useContext, useMemo } from 'react'

import { useSharedStore } from 'ui/src/hooks/use-store'
import type { CURVE, Keystore } from 'ui/src/store/types'

import type { MessageTypes as BackgroundMessageTypes } from '@src/browser/background/message-handlers'
import { MessageAction as BackgroundMessageAction } from '@src/browser/background/types'
import { ClientContext } from '@src/context/message-client-provider'
import { publicKeyFromJSON } from '@src/crypto/key_pair'
import { signatureFromJSON, signatureWithPublicKeyFromJSON } from '@src/crypto/signature'
import type { Data } from '@src/types/vault'

export const useMessageClient = () => {
	const client = useContext(ClientContext)

	const { reloadTrigger } = useSharedStore(state => ({
		reloadTrigger: state.reloadSharedStoreAction,
	}))

	const sendMessageToBackground = useCallback(
		(action: BackgroundMessageAction, payload: BackgroundMessageTypes[keyof BackgroundMessageTypes] = {}) =>
			client.sendMessage(action, payload as BackgroundMessageTypes[typeof action]),
		[client],
	)

	const sendMessageToBackgroundAndUpdateTrigger = useCallback(
		async (action: BackgroundMessageAction, payload: BackgroundMessageTypes[keyof BackgroundMessageTypes] = {}) => {
			const response = await client.sendMessage(action, payload as BackgroundMessageTypes[typeof action])
			reloadTrigger()
			return response
		},
		[client, reloadTrigger],
	)

	return useMemo(
		() => ({
			ping: (): Promise<boolean> => sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_PING),

			getSecret: (password: string): Promise<string | null> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_GET, {
					password,
				}),

			lockVault: (): Promise<void> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_LOCK),
			unlockVault: (password: string): Promise<void> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_UNLOCK, {
					password,
				}),
			storeInVault: (keystore: Keystore, data: Data, password: string): Promise<void> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_SAVE, {
					keystore,
					data,
					password,
				}),
			removeFromVault: (password: string) =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_VAULT_REMOVE, {
					password,
				}),
			isVaultUnlocked: (): Promise<boolean> =>
				sendMessageToBackground(BackgroundMessageAction.BACKGROUND_VAULT_IS_UNLOCKED),

			getPublicKey: (curve: CURVE, derivationPath: string): Promise<PublicKey | null> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_GET_PUBLIC_KEY, {
					curve,
					derivationPath,
				}).then(resp => publicKeyFromJSON(resp || {})),

			signToSignature: (
				curve: CURVE,
				derivationPath: string,
				password: string,
				data: Uint8Array,
			): Promise<Signature | null> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE, {
					curve,
					derivationPath,
					password,
					toSign: Convert.Uint8Array.toHexString(data),
				}).then(resp => signatureFromJSON(resp || {})),
			signToSignatureWithPublicKey: (
				curve: CURVE,
				derivationPath: string,
				password: string,
				data: Uint8Array,
			): Promise<SignatureWithPublicKey | null> =>
				sendMessageToBackgroundAndUpdateTrigger(BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY, {
					curve,
					derivationPath,
					password,
					toSign: Convert.Uint8Array.toHexString(data),
				}).then(resp => signatureWithPublicKeyFromJSON(resp || {})),
		}),
		[sendMessageToBackgroundAndUpdateTrigger, sendMessageToBackground],
	)
}
