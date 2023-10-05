import type { PublicKey, Signature, SignatureWithPublicKey } from '@radixdlt/radix-engine-toolkit'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import { useContext, useMemo } from 'react'

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

	const updateCursor = result => {
		reloadTrigger()
		return result
	}

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
			isSecretEmpty: async (): Promise<boolean> =>
				client.sendMessage(BackgroundMessageAction.BACKGROUND_VAULT_IS_SECRET_EMPTY).then(updateCursor),

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

			getPublicKey: async (curve: CURVE, derivationPath: string): Promise<PublicKey | null> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_GET_PUBLIC_KEY, {
						curve,
						derivationPath,
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_GET_PUBLIC_KEY])
					.then(resp => publicKeyFromJSON(resp || {}))
					.then(updateCursor),

			signToSignature: async (
				curve: CURVE,
				derivationPath: string,
				password: string,
				data: Uint8Array,
			): Promise<Signature | null> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE, {
						curve,
						derivationPath,
						password,
						toSign: Convert.Uint8Array.toHexString(data),
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE])
					.then(resp => signatureFromJSON(resp || {}))
					.then(updateCursor),
			signToSignatureWithPublicKey: async (
				curve: CURVE,
				derivationPath: string,
				password: string,
				data: Uint8Array,
			): Promise<SignatureWithPublicKey | null> =>
				client
					.sendMessage(BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY, {
						curve,
						derivationPath,
						password,
						toSign: Convert.Uint8Array.toHexString(data),
					} as BackgroundMessageTypes[BackgroundMessageAction.BACKGROUND_SIGN_TO_SIGNATURE_WITH_PUBLIC_KEY])
					.then(resp => signatureWithPublicKeyFromJSON(resp || {}))
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
