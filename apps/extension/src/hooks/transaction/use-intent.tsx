import type { SendTransactionInput } from '@radixdlt/radix-dapp-toolkit'
import { Convert, InstructionsKind, RadixEngineToolkit, generateRandomNonce } from '@radixdlt/radix-engine-toolkit'
import type { Intent, Message, TransactionHeader, TransactionManifest } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useGatewayClient } from 'ui/src/hooks/dapp/use-gateway-client'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { buildAccountDerivationPath } from '@src/crypto/derivation_path'
import { deriveEd25519, ed25519FromSeed } from '@src/crypto/key_pair'
import { createMnemonic } from '@src/crypto/secret'
import { appendLockFeeInstruction, countNftGuarantees, countTokenGuarantees } from '@src/radix/transaction'
import type { TransactionMeta, TransactionSettings } from '@src/types/transaction'

const messages = defineMessages({
	empty_signatures_error: {
		id: 'Id1C9e',
		defaultMessage: 'Failed to resolve authorization requirements, try with different wallet.',
	},
})

const noMessage: Extract<Message, { kind: 'None' }> = { kind: 'None' }

function plainTextMessage(message: string): Extract<Message, { kind: 'PlainText' }> {
	return {
		kind: 'PlainText',
		value: {
			mimeType: 'text/plain',
			message: { kind: 'String', value: message },
		},
	}
}

const notaryRoot = ed25519FromSeed(createMnemonic())

export const useIntent = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const { status } = useGatewayClient()

	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const buildIntent = async (input: SendTransactionInput, settings: TransactionSettings) => {
		const instructions = await RadixEngineToolkit.Instructions.convert(
			{
				kind: InstructionsKind.String,
				value: input.transactionManifest,
			},
			networkId,
			'Parsed',
		)

		const extractAddresses = await RadixEngineToolkit.Instructions.extractAddresses(instructions, networkId)
		const needSignaturesFrom = [
			...extractAddresses.GlobalVirtualEd25519Account,
			...extractAddresses.GlobalVirtualSecp256k1Account,
			...(settings.feePayer ? [settings.feePayer] : []),
		]
			.filter((value, index, array) => array.indexOf(value) === index) // unique
			.filter(value => !!accountIndexes[value])
		if (needSignaturesFrom.length === 0) {
			throw new Error(intl.formatMessage(messages.empty_signatures_error))
		}

		const notary = deriveEd25519(notaryRoot, buildAccountDerivationPath(networkId, 0))
		const { ledger_state: ledgerState } = await status.getCurrent()
		const validFromEpoch: number = ledgerState.epoch

		const header: TransactionHeader = {
			networkId,
			startEpochInclusive: validFromEpoch,
			endEpochExclusive: validFromEpoch + 10,
			nonce: generateRandomNonce(),
			notaryPublicKey: notary.publicKey(),
			notaryIsSignatory: false,
			tipPercentage: settings.tipPercentage || 0,
		}

		const manifest: TransactionManifest = {
			instructions: appendLockFeeInstruction(
				instructions,
				settings.feePayer || needSignaturesFrom[0],
				settings.lockAmount || 1,
			),
			blobs: input.blobs?.map(blob => Convert.HexString.toUint8Array(blob)) || [],
		}

		const intent: Intent = { header, manifest, message: input.message ? plainTextMessage(input.message) : noMessage }
		const meta: TransactionMeta = {
			isNotarySignatory: header.notaryIsSignatory,
			needSignaturesFrom,
			nftGuaranteesCount: countNftGuarantees(instructions),
			tokenGuaranteesCount: countTokenGuarantees(instructions),
		}

		return { notary, intent, meta }
	}

	return useCallback(buildIntent, [networkId, accountIndexes, status])
}
