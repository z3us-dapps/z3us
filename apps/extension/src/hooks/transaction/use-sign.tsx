import {
	CompiledSignedTransactionIntent,
	RadixEngineToolkit,
	rawRadixEngineToolkit,
} from '@radixdlt/radix-engine-toolkit'
import type { CompiledNotarizedTransaction, Intent, PrivateKey, SignedIntent } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { useSignTransactionWithBackground } from './use-sign-background'
import { useSignTransactionWithLedger } from './use-sign-ledger'

export const useSign = () => {
	const networkId = useNetworkId()

	const signBackground = useSignTransactionWithBackground()
	const signLedger = useSignTransactionWithLedger()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const sign = async (
		notary: PrivateKey,
		intent: Intent,
		needSignaturesFrom: string[],
	): Promise<CompiledNotarizedTransaction> => {
		const signedIntent: SignedIntent = { intent, intentSignatures: [] }
		switch (keystore?.type) {
			case KeystoreType.LOCAL:
				signedIntent.intentSignatures = await signBackground(intent, needSignaturesFrom)
				break
			case KeystoreType.HARDWARE:
				signedIntent.intentSignatures = await signLedger(intent, needSignaturesFrom)
				break
			default:
				throw new Error(`Can not sign with keystore type: ${keystore?.type}`)
		}

		const intentHash = await RadixEngineToolkit.Intent.intentHash(intent)
		const signedIntentHash = await RadixEngineToolkit.SignedIntent.signedIntentHash(signedIntent)
		const compiledSignedIntent = await RadixEngineToolkit.SignedIntent.compile(signedIntent)
		const notarizedTransaction = await new CompiledSignedTransactionIntent(
			await rawRadixEngineToolkit,
			intentHash,
			signedIntent,
			compiledSignedIntent,
			signedIntentHash,
		).compileNotarizedAsync(async (hash: Uint8Array) => Promise.resolve(notary.signToSignature(hash)))

		const validity = await notarizedTransaction.staticallyValidate(networkId)
		validity.throwIfInvalid()

		return notarizedTransaction
	}

	return useCallback(sign, [networkId, keystore, signBackground, signLedger])
}
