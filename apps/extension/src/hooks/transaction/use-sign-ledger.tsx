import type { Intent, SignatureWithPublicKey } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import type { HardwareKeySource } from 'ui/src/store/types'

import { signatureCurveFromLedgerCurve } from '@src/browser/ledger/signature'
import { signatureWithPublicKeyFromJSON } from '@src/crypto/signature'

import { useLedgerClient } from '../use-ledger-client'

export const useSignTransactionWithLedger = () => {
	const ledger = useLedgerClient()
	const accountIndexes = useAccountIndexes()

	const sign = async (
		keySource: HardwareKeySource,
		intent: Intent,
		needSignaturesFrom: string[],
	): Promise<SignatureWithPublicKey[]> => {
		const compiledIntent = await RadixEngineToolkit.Intent.compile(intent)
		const ledgerSignatures = await ledger.signTx(
			keySource,
			needSignaturesFrom.map(address => accountIndexes[address]),
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
