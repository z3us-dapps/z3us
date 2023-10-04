/* eslint-disable no-case-declarations */
import { useCallback } from 'react'

import { useSharedStore } from 'ui/src/hooks/use-store'
import type { CURVE } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

import { signatureCurveFromLedgerCurve } from '@src/browser/ledger/signature'
import { publicKeyFromJSON } from '@src/crypto/key_pair'
import { useMessageClient } from '@src/hooks/use-message-client'

import { useLedgerClient } from './use-ledger-client'

export const useGetPublicKey = () => {
	const client = useMessageClient()
	const ledger = useLedgerClient()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	return useCallback(
		async (curve: CURVE, derivationPath: string) => {
			switch (keystore?.type) {
				case KeystoreType.LOCAL:
					return client.getPublicKey(curve, derivationPath)
				case KeystoreType.HARDWARE:
					const [ledgerPublicKey] = await ledger.derivePublicKeys([
						{
							curve,
							derivationPath,
						},
					])
					return publicKeyFromJSON({
						publicKey: ledgerPublicKey.publicKey,
						curve: signatureCurveFromLedgerCurve(ledgerPublicKey.curve),
					})
				default:
					throw new Error(`Can not derive public key type: ${keystore?.type}`)
			}
		},
		[keystore],
	)
}
