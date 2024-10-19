import type { Intent } from '@radixdlt/radix-engine-toolkit'
import { Convert, RadixEngineToolkit, generateRandomNonce } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useGatewayClient } from 'ui/src/hooks/dapp/use-gateway-client'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { gatewayPublicKeyFromPersonaOrAccount } from '@src/crypto/key_pair'
import type { TransactionSettings } from '@src/types/transaction'

export const usePreview = () => {
	const networkId = useNetworkId()
	const { status, transaction } = useGatewayClient()

	const { allAccountIndexes } = useNoneSharedStore(state => ({
		allAccountIndexes: state.accountIndexes,
	}))

	const buildPreview = async (intent: Intent, settings: TransactionSettings) => {
		const accountIndexes = allAccountIndexes[intent.header.networkId] || {}
		const { ledger_state: ledgerState } = await status.getCurrent()
		const validFromEpoch: number = ledgerState.epoch
		const extractAddresses = await RadixEngineToolkit.Instructions.extractAddresses(
			intent.manifest.instructions,
			intent.header.networkId,
		)
		const accountAddresses = [
			...extractAddresses.GlobalVirtualEd25519Account,
			...extractAddresses.GlobalVirtualSecp256k1Account,
		]
		const signerPublicKeys = accountAddresses
			.filter(address => !!accountIndexes[address])
			.map(address => gatewayPublicKeyFromPersonaOrAccount(accountIndexes[address]))

		const manifest = await RadixEngineToolkit.Instructions.convert(
			intent.manifest.instructions,
			intent.header.networkId,
			'String',
		)

		const blobs = intent.manifest.blobs?.map(blob => Convert.Uint8Array.toHexString(blob)) || []

		return transaction.innerClient.transactionPreview({
			transactionPreviewRequest: {
				manifest: manifest.value as string,
				blobs_hex: blobs,
				start_epoch_inclusive: validFromEpoch,
				end_epoch_exclusive: validFromEpoch + 10,
				nonce: generateRandomNonce(),
				signer_public_keys: signerPublicKeys,
				tip_percentage: settings.tipPercentage || 0,
				flags: {
					use_free_credit: false,
					assume_all_signature_proofs: true,
					skip_epoch_check: true,
				},
			},
		})
	}

	return useCallback(buildPreview, [networkId, allAccountIndexes, status, transaction])
}
