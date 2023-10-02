import type { SendTransactionInput } from '@radixdlt/radix-dapp-toolkit'
import type {
	Instruction,
	Intent,
	SignedIntent,
	TransactionHeader,
	TransactionManifest,
} from '@radixdlt/radix-engine-toolkit'
import {
	CompiledSignedTransactionIntent,
	Convert,
	InstructionsKind,
	RadixEngineToolkit,
	ValueKind,
	decimal,
	generateRandomNonce,
	rawRadixEngineToolkit,
} from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Input } from 'ui/src/components/input'
import { useGatewayClient } from 'ui/src/hooks/dapp/use-gateway-client'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { useMessageClient } from '@src/hooks/use-message-client'
import { useSignModal } from '@src/hooks/use-sign-modal'

const messages = defineMessages({
	empty_signatures_error: {
		id: 'hooks.send-transaction.empty_signatures_error',
		defaultMessage: 'Failed to resolve authorization requirements, try with different wallet.',
	},
})

const modalContent = (manifest: string) => <Input value={manifest} elementType="textarea" type="textarea" disabled />

export const useSendTransaction = () => {
	const intl = useIntl()
	const client = useMessageClient()
	const networkId = useNetworkId()
	const confirm = useSignModal()
	const { status, transaction } = useGatewayClient()
	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const sendTransaction = async (
		input: SendTransactionInput,
		fromAccount: string = undefined,
		feePayerAccount: string = undefined,
		tipPercentage: number = 0,
	): Promise<string> => {
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
			...(fromAccount ? [fromAccount] : []),
			...(feePayerAccount ? [feePayerAccount] : []),
		].filter((value, index, array) => array.indexOf(value) === index) // unique

		const needSignaturesFrom = Object.keys(accountIndexes).filter(idx =>
			accountAddresses.includes(accountIndexes[idx].address),
		)
		if (needSignaturesFrom.length === 0) {
			throw new Error(intl.formatMessage(messages.empty_signatures_error))
		}
		if (!fromAccount) {
			fromAccount = accountIndexes[+needSignaturesFrom[0]].address
			needSignaturesFrom.shift()
		}

		const fromAccountIndex = +Object.keys(accountIndexes).find(idx => accountIndexes[idx].address === fromAccount)

		// BUILD TX AND SIGN
		const { ledger_state: ledgerState } = await status.getCurrent()
		const validFromEpoch: number = ledgerState.epoch
		const notaryPublicKey = await client.getPublicKey('account', fromAccountIndex)

		const header: TransactionHeader = {
			networkId,
			startEpochInclusive: validFromEpoch,
			endEpochExclusive: validFromEpoch + 10,
			nonce: generateRandomNonce(),
			notaryPublicKey,
			notaryIsSignatory: true,
			tipPercentage,
		}

		instructions.value = [
			{
				kind: 'CallMethod',
				address: {
					kind: 'Static',
					value: feePayerAccount || fromAccount,
				},
				methodName: 'lock_fee',
				args: {
					kind: ValueKind.Tuple,
					fields: [decimal(5)],
				},
			},
			...instructions.value,
		] as Instruction[]
		const manifest: TransactionManifest = {
			instructions,
			blobs: input.blobs?.map(blob => Convert.HexString.toUint8Array(blob)) || [],
		}

		const intent: Intent = { header, manifest }
		const intentHash = await RadixEngineToolkit.Intent.intentHash(intent)

		const content = modalContent(input.transactionManifest)
		const signatures = await Promise.all(
			needSignaturesFrom.map(idx =>
				confirm(content).then(password =>
					client.signToSignatureWithPublicKey('account', password, intentHash.hash, +idx),
				),
			),
		)

		const signedIntent: SignedIntent = { intent, intentSignatures: signatures }
		const signedIntentHash = await RadixEngineToolkit.SignedIntent.signedIntentHash(signedIntent)
		const compiledSignedIntent = await RadixEngineToolkit.SignedIntent.compile(signedIntent)
		const notarizedTransaction = await new CompiledSignedTransactionIntent(
			await rawRadixEngineToolkit,
			intentHash,
			signedIntent,
			compiledSignedIntent,
			signedIntentHash,
		).compileNotarizedAsync(async (hash: Uint8Array) =>
			confirm(content).then(password => client.signToSignature('account', password, hash, fromAccountIndex)),
		)

		// VALIDATE
		const validity = await notarizedTransaction.staticallyValidate(networkId)
		validity.throwIfInvalid()

		// SUBMIT
		const submission = await transaction.innerClient.transactionSubmit({
			transactionSubmitRequest: { notarized_transaction_hex: notarizedTransaction.toHex() },
		})

		try {
			// SUMMARY
			const summary = await notarizedTransaction.summarizeTransaction()
			// eslint-disable-next-line no-console
			console.log('summary', summary)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(`summarizeTransaction: ${error.message}`)
		}

		// eslint-disable-next-line no-console
		console.log('manifest', input.transactionManifest)
		// eslint-disable-next-line no-console
		console.log('submission', submission)
		// eslint-disable-next-line no-console
		console.log('intentHashHex', notarizedTransaction.intentHashHex())
		// eslint-disable-next-line no-console
		console.log('transactionIdHex', notarizedTransaction.transactionIdHex())
		// eslint-disable-next-line no-console
		console.log('intentHash', intentHash.id)

		return notarizedTransaction.intentHashHex()
	}

	return useCallback(sendTransaction, [networkId, accountIndexes, confirm])
}
