import { type SendTransactionInput, TransactionStatus } from '@radixdlt/radix-dapp-toolkit'
import { useCallback } from 'react'

import { useGatewayClient } from 'ui/src/hooks/dapp/use-gateway-client'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'

import { useIntent } from './use-intent'
import { useSign } from './use-sign'

export const useSendTransaction = () => {
	const networkId = useNetworkId()
	const { transaction } = useGatewayClient()

	const buildIntent = useIntent()
	const sign = useSign()

	const sendTransaction = async (
		input: SendTransactionInput,
		feePayer: string = undefined,
		tipPercentage: number = 0,
	): Promise<{
		transactionIntentHash: string
		status: TransactionStatus
	}> => {
		const { notary, intent, needSignaturesFrom } = await buildIntent(input, feePayer, tipPercentage)
		const notarizedTransaction = await sign(notary, intent, needSignaturesFrom)

		await transaction.innerClient.transactionSubmit({
			transactionSubmitRequest: { notarized_transaction_hex: notarizedTransaction.toHex() },
		})

		return {
			transactionIntentHash: notarizedTransaction.intentHashHex(),
			status: TransactionStatus.Pending,
		}
	}

	return useCallback(sendTransaction, [networkId, transaction, sign, buildIntent])
}
