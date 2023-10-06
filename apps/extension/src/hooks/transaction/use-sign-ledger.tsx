import type { Intent, SignatureWithPublicKey } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { signatureCurveFromLedgerCurve } from '@src/browser/ledger/signature'
import { signatureWithPublicKeyFromJSON } from '@src/crypto/signature'

import { useLedgerClient } from '../use-ledger-client'

export const useSignTransactionWithLedger = () => {
	const networkId = useNetworkId()
	const ledger = useLedgerClient()

	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const sign = async (intent: Intent, needSignaturesFrom: string[]): Promise<SignatureWithPublicKey[]> => {
		const compiledIntent = await RadixEngineToolkit.Intent.compile(intent)
		const ledgerSignatures = await ledger.signTx(
			needSignaturesFrom.map(idx => accountIndexes[idx]),
			compiledIntent,
		)
		return ledgerSignatures.map(ledgerSignature =>
			signatureWithPublicKeyFromJSON({
				signature: ledgerSignature.signature,
				publicKey: ledgerSignature.derivedPublicKey.publicKey,
				curve: signatureCurveFromLedgerCurve(ledgerSignature.derivedPublicKey.curve),
			}),
		)
	}

	return useCallback(sign, [accountIndexes, ledger])
}
