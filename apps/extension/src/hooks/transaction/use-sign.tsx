/* eslint-disable no-case-declarations */
import {
	CompiledSignedTransactionIntent,
	RadixEngineToolkit,
	rawRadixEngineToolkit,
} from '@radixdlt/radix-engine-toolkit'
import type { CompiledNotarizedTransaction, Intent, PrivateKey, SignedIntent } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useSharedStore } from 'ui/src/hooks/use-store'
import type { Accounts, Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

import { type SignatureWithPublicKeyJSON, signatureWithPublicKeyFromJSON } from '@src/crypto/signature'

import { useSignTransactionWithBackground } from './use-sign-background'
import { useSignTransactionWithLedger } from './use-sign-ledger'

function groupAddressesByCombinedKeystoreId(accounts: Accounts, needSignaturesFrom: string[]) {
	return needSignaturesFrom.reduce((rv, address) => {
		if (!rv[accounts[address].combinedKeystoreId]) {
			rv[accounts[address].combinedKeystoreId] = []
		}
		rv[accounts[address].combinedKeystoreId].push(address)
		return rv
	}, {})
}

export const useSign = () => {
	const networkId = useNetworkId()
	const accountIndexes = useAccountIndexes()
	const signBackground = useSignTransactionWithBackground()
	const signLedger = useSignTransactionWithLedger()

	const { selectedKeystore } = useSharedStore(state => ({
		selectedKeystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const sign = useCallback(
		async (keystore: Keystore, intent: Intent, needSignaturesFrom: string[]): Promise<SignatureWithPublicKeyJSON[]> => {
			switch (keystore?.type) {
				case KeystoreType.LOCAL:
					return signBackground(intent, needSignaturesFrom)
					break
				case KeystoreType.HARDWARE:
					return signLedger(keystore, intent, needSignaturesFrom)
					break
				case KeystoreType.COMBINED:
					const grouped = groupAddressesByCombinedKeystoreId(accountIndexes, needSignaturesFrom)
					const combinedKeystoreIds = Object.keys(grouped)
					const combinedResponses = await Promise.all(
						combinedKeystoreIds.map(async combinedKeystoreId =>
							sign(keystore.keySources[combinedKeystoreId], intent, grouped[combinedKeystoreId]),
						),
					)
					return combinedResponses.flat()
				default:
					throw new Error(`Can not sign with keystore type: ${keystore?.type}`)
			}
		},
		[accountIndexes, signBackground, signLedger],
	)

	const signAndNotarize = useCallback(
		async (
			keystore: Keystore,
			notary: PrivateKey,
			intent: Intent,
			needSignaturesFrom: string[],
		): Promise<CompiledNotarizedTransaction> => {
			const signatures = await sign(keystore, intent, needSignaturesFrom)
			const signedIntent: SignedIntent = {
				intent,
				intentSignatures: signatures.map(s => signatureWithPublicKeyFromJSON(s)),
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
		},
		[networkId, sign],
	)

	return useCallback(
		async (notary: PrivateKey, intent: Intent, needSignaturesFrom: string[]) =>
			signAndNotarize(selectedKeystore, notary, intent, needSignaturesFrom),
		[selectedKeystore, signAndNotarize],
	)
}
