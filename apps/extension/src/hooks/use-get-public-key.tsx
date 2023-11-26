/* eslint-disable no-case-declarations */
import { useCallback } from 'react'

import { useSharedStore } from 'ui/src/hooks/use-store'
import type { CURVE, Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

import { signatureCurveFromLedgerCurve } from '@src/browser/ledger/signature'
import { publicKeyFromJSON } from '@src/crypto/key_pair'
import { useMessageClient } from '@src/hooks/use-message-client'

import { useLedgerClient } from './use-ledger-client'

export const useGetPublicKey = () => {
	const client = useMessageClient()
	const ledger = useLedgerClient()

	const { selectedKeystore } = useSharedStore(state => ({
		selectedKeystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const getPublicKey = useCallback(
		async (keystore: Keystore, curve: CURVE, derivationPath: string, combinedKeystoreId: string) => {
			switch (keystore?.type) {
				case KeystoreType.LOCAL:
					return client.getPublicKey(curve, derivationPath, combinedKeystoreId)
				case KeystoreType.HARDWARE:
					const [ledgerPublicKey] = await ledger.derivePublicKeys(keystore, [
						{
							curve,
							derivationPath,
						},
					])
					return publicKeyFromJSON({
						publicKey: ledgerPublicKey.publicKey,
						curve: signatureCurveFromLedgerCurve(ledgerPublicKey.curve),
					})
				case KeystoreType.COMBINED:
					return getPublicKey(
						{ id: combinedKeystoreId, name: keystore.id, ...keystore.keySources[combinedKeystoreId] },
						curve,
						derivationPath,
						'',
					)
				default:
					throw new Error(`Can not derive public key type: ${keystore?.type}`)
			}
		},
		[client, ledger],
	)

	return useCallback(
		async (curve: CURVE, derivationPath: string, combinedKeystoreId: string = '') =>
			getPublicKey(selectedKeystore, curve, derivationPath, combinedKeystoreId),
		[selectedKeystore, getPublicKey],
	)
}
