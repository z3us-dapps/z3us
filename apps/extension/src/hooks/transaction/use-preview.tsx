import type { Instructions } from '@radixdlt/radix-engine-toolkit'
import { RadixEngineToolkit, generateRandomNonce } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useGatewayClient } from 'ui/src/hooks/dapp/use-gateway-client'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { gatewayPublicKeyFromPersonaOrAccount } from '@src/crypto/key_pair'
import type { TransactionSettings } from '@src/types/transaction'

export const usePreview = () => {
	const networkId = useNetworkId()
	const { status, transaction } = useGatewayClient()

	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const buildPreview = async (instructions: Instructions, manifest: string, settings: TransactionSettings = {}) => {
		const { ledger_state: ledgerState } = await status.getCurrent()
		const validFromEpoch: number = ledgerState.epoch
		const extractAddresses = await RadixEngineToolkit.Instructions.extractAddresses(instructions, networkId)
		const accountAddresses = [
			...extractAddresses.GlobalVirtualEd25519Account,
			...extractAddresses.GlobalVirtualSecp256k1Account,
		]
		const signerPublicKeys = accountAddresses.map(address =>
			gatewayPublicKeyFromPersonaOrAccount(accountIndexes[address]),
		)

		return transaction.innerClient.transactionPreview({
			transactionPreviewRequest: {
				manifest,
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

	return useCallback(buildPreview, [networkId, accountIndexes, status, transaction])
}
