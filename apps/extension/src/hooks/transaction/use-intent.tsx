import type { SendTransactionInput } from '@radixdlt/radix-dapp-toolkit'
import { Convert, InstructionsKind, RadixEngineToolkit, generateRandomNonce } from '@radixdlt/radix-engine-toolkit'
import type { Intent, TransactionHeader, TransactionManifest } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useGatewayClient } from 'ui/src/hooks/dapp/use-gateway-client'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { buildAccountDerivationPath } from '@src/crypto/derivation_path'
import { deriveEd25519, ed25519FromEntropy } from '@src/crypto/key_pair'
import { createMnemonic } from '@src/crypto/secret'
import { appendLockFeeInstruction } from '@src/radix/transaction'

const messages = defineMessages({
	empty_signatures_error: {
		id: 'hooks.transaction.send.empty_signatures_error',
		defaultMessage: 'Failed to resolve authorization requirements, try with different wallet.',
	},
})

export const useIntent = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const { status } = useGatewayClient()

	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const buildIntent = async (input: SendTransactionInput, feePayer: string = '', tipPercentage: number = 0) => {
		const instructions = await RadixEngineToolkit.Instructions.convert(
			{
				kind: InstructionsKind.String,
				value: input.transactionManifest,
			},
			networkId,
			'Parsed',
		)

		const extractAddresses = await RadixEngineToolkit.Instructions.extractAddresses(instructions, networkId)
		const accountAddresses = [
			...extractAddresses.GlobalVirtualEd25519Account,
			...extractAddresses.GlobalVirtualSecp256k1Account,
			...(feePayer ? [feePayer] : []),
		].filter((value, index, array) => array.indexOf(value) === index) // unique

		const needSignaturesFrom = Object.keys(accountIndexes).filter(address => accountAddresses.includes(address))
		if (needSignaturesFrom.length === 0) {
			throw new Error(intl.formatMessage(messages.empty_signatures_error))
		}

		const notary = deriveEd25519(ed25519FromEntropy(createMnemonic()), buildAccountDerivationPath(networkId, 0))
		const { ledger_state: ledgerState } = await status.getCurrent()
		const validFromEpoch: number = ledgerState.epoch

		const header: TransactionHeader = {
			networkId,
			startEpochInclusive: validFromEpoch,
			endEpochExclusive: validFromEpoch + 10,
			nonce: generateRandomNonce(),
			notaryPublicKey: notary.publicKey(),
			notaryIsSignatory: false,
			tipPercentage,
		}

		const manifest: TransactionManifest = {
			instructions: appendLockFeeInstruction(instructions, feePayer || needSignaturesFrom[0]),
			blobs: input.blobs?.map(blob => Convert.HexString.toUint8Array(blob)) || [],
		}

		const intent: Intent = { header, manifest }

		return { notary, intent, needSignaturesFrom }
	}

	return useCallback(buildIntent, [networkId, accountIndexes, status])
}
