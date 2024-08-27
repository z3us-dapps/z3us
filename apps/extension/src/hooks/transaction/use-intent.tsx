import type { SendTransactionInput } from '@radixdlt/radix-dapp-toolkit'
import { Convert, InstructionsKind, RadixEngineToolkit, generateRandomNonce } from '@radixdlt/radix-engine-toolkit'
import type {
	Instruction,
	Intent,
	Message,
	TransactionHeader,
	TransactionManifest,
} from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useGatewayClient } from 'ui/src/hooks/dapp/use-gateway-client'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'

import { buildAccountDerivationPath } from '@src/crypto/derivation_path'
import { deriveEd25519, ed25519FromSeed } from '@src/crypto/key_pair'
import { createMnemonic } from '@src/crypto/secret'
import { summaryFromInstructions } from '@src/networks/radix/manifest'
import { appendAssertWorktopContainsFungibles, appendLockFeeInstruction } from '@src/networks/radix/transaction'
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
	const accountIndexes = useAccountIndexes()

	const buildIntent = async (input: SendTransactionInput, settings: TransactionSettings) => {
		let instructions = await RadixEngineToolkit.Instructions.convert(
			{
				kind: InstructionsKind.String,
				value: input.transactionManifest,
			},
			networkId,
			'Parsed',
		)

		const extractAddresses = await RadixEngineToolkit.Instructions.extractAddresses(instructions, networkId)
		const walletAddresses = [
			...extractAddresses.GlobalVirtualEd25519Account,
			...extractAddresses.GlobalVirtualSecp256k1Account,
			...(settings.feePayer ? [settings.feePayer] : []),
		]
			.filter((value, index, array) => array.indexOf(value) === index) // unique
			.filter(value => !!accountIndexes[value])

		const feePayer =
			settings.feePayer ||
			walletAddresses.sort((x, y) => input.transactionManifest.indexOf(x) - input.transactionManifest.indexOf(y))[0] ||
			Object.keys(accountIndexes)[0]

		if (!feePayer) {
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

		let offset = 0
		Object.values(settings.guarantees).forEach(guarantee => {
			if (guarantee.amount > 0) {
				const before = instructions.value.length
				instructions = appendAssertWorktopContainsFungibles(
					instructions,
					guarantee.resourceAddress,
					guarantee.amount,
					guarantee.index + offset + 1,
				)
				offset += instructions.value.length - before
			}
		})
		instructions = appendLockFeeInstruction(instructions, feePayer, settings.lockAmount || 1)

		const manifest: TransactionManifest = {
			instructions,
			blobs: input.blobs?.map(blob => Convert.HexString.toUint8Array(blob)) || [],
		}

		const intent: Intent = { header, manifest, message: input.message ? plainTextMessage(input.message) : noMessage }
		const summary = summaryFromInstructions(instructions.value as Instruction[])

		const meta: TransactionMeta = {
			isNotarySignatory: header.notaryIsSignatory,
			needSignaturesFrom: walletAddresses.filter(address => summary.needSignatureFrom[address]),
			summary,
		}

		const transactionManifest = await RadixEngineToolkit.Instructions.convert(
			manifest.instructions,
			intent.header.networkId,
			'String',
		)

		return { notary, intent, meta, transactionManifest: transactionManifest.value as string }
	}

	return useCallback(buildIntent, [networkId, accountIndexes, status])
}
