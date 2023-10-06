/* eslint-disable no-case-declarations */
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
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { signatureCurveFromLedgerCurve } from '@src/browser/ledger/signature'
import { signatureFromJSON, signatureWithPublicKeyFromJSON } from '@src/crypto/signature'
import { useMessageClient } from '@src/hooks/use-message-client'
import { useSignModal } from '@src/hooks/use-sign-modal'

import { useGetPublicKey } from './use-get-public-key'
import { useLedgerClient } from './use-ledger-client'

const messages = defineMessages({
	empty_signatures_error: {
		id: 'hooks.send-transaction.empty_signatures_error',
		defaultMessage: 'Failed to resolve authorization requirements, try with different wallet.',
	},
})

const modalContent = (manifest: string) => <Input value={manifest} elementType="textarea" type="textarea" disabled />

export const useSendTransaction = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const confirm = useSignModal()

	const client = useMessageClient()
	const ledger = useLedgerClient()
	const { status, transaction } = useGatewayClient()
	const getPublicKey = useGetPublicKey()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const signWithBackground = useCallback(
		async (needSignaturesFrom: string[], notarizeBy: string, intent: Intent) => {
			const content = modalContent('noting')
			const password = await confirm(content)

			const intentHash = await RadixEngineToolkit.Intent.intentHash(intent)
			const intentSignatures = await Promise.all(
				needSignaturesFrom.map(signBy =>
					client.signToSignatureWithPublicKey(
						accountIndexes[signBy].curve,
						accountIndexes[signBy].derivationPath,
						password,
						intentHash.hash,
					),
				),
			)

			const signedIntent: SignedIntent = { intent, intentSignatures }
			const signedIntentHash = await RadixEngineToolkit.SignedIntent.signedIntentHash(signedIntent)
			const compiledSignedIntent = await RadixEngineToolkit.SignedIntent.compile(signedIntent)
			const notarizedTransaction = await new CompiledSignedTransactionIntent(
				await rawRadixEngineToolkit,
				intentHash,
				signedIntent,
				compiledSignedIntent,
				signedIntentHash,
			).compileNotarizedAsync((hash: Uint8Array) =>
				client.signToSignature(
					accountIndexes[notarizeBy].curve,
					accountIndexes[notarizeBy].derivationPath,
					password,
					hash,
				),
			)
			return notarizedTransaction
		},
		[keystore, client],
	)

	const signWithLedger = useCallback(
		async (needSignaturesFrom: string[], notarizeBy: string, intent: Intent) => {
			const intentHash = await RadixEngineToolkit.Intent.intentHash(intent)
			const signedIntent: SignedIntent = { intent, intentSignatures: [] }
			if (needSignaturesFrom.length === 0) {
				const compiledIntent = await RadixEngineToolkit.Intent.compile(intent)
				const ledgerSignatures = await ledger.signTx(
					needSignaturesFrom.map(idx => accountIndexes[idx]),
					compiledIntent,
				)
				signedIntent.intentSignatures = ledgerSignatures.map(ledgerSignature =>
					signatureWithPublicKeyFromJSON({
						signature: ledgerSignature.signature,
						publicKey: ledgerSignature.derivedPublicKey.publicKey,
						curve: signatureCurveFromLedgerCurve(ledgerSignature.derivedPublicKey.curve),
					}),
				)
			}
			const signedIntentHash = await RadixEngineToolkit.SignedIntent.signedIntentHash(signedIntent)
			const compiledSignedIntent = await RadixEngineToolkit.SignedIntent.compile(signedIntent)
			const [notary] = await ledger.signTx([accountIndexes[notarizeBy]], compiledSignedIntent)
			const notarizedTransaction = await new CompiledSignedTransactionIntent(
				await rawRadixEngineToolkit,
				intentHash,
				signedIntent,
				compiledSignedIntent,
				signedIntentHash,
			).compileNotarized(
				signatureFromJSON({
					signature: notary.signature,
					curve: signatureCurveFromLedgerCurve(notary.derivedPublicKey.curve),
				}),
			)
			return notarizedTransaction
		},
		[keystore, ledger],
	)

	const sign = useCallback(
		async (needSignaturesFrom: string[], notarizeBy: string, intent: Intent) => {
			switch (keystore?.type) {
				case KeystoreType.LOCAL:
					return signWithBackground(needSignaturesFrom, notarizeBy, intent)
				case KeystoreType.HARDWARE:
					return signWithLedger(needSignaturesFrom, notarizeBy, intent)
				default:
					throw new Error(`Can not sign with keystore type: ${keystore?.type}`)
			}
		},
		[keystore, signWithBackground, signWithLedger],
	)

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

		const needSignaturesFrom = Object.keys(accountIndexes).filter(address => accountAddresses.includes(address))
		if (needSignaturesFrom.length === 0) {
			throw new Error(intl.formatMessage(messages.empty_signatures_error))
		}
		if (!fromAccount) {
			// eslint-disable-next-line prefer-destructuring
			fromAccount = needSignaturesFrom[0]
			needSignaturesFrom.shift()
		}

		// BUILD TX AND SIGN
		const { ledger_state: ledgerState } = await status.getCurrent()
		const validFromEpoch: number = ledgerState.epoch
		const notaryPublicKey = await getPublicKey(
			accountIndexes[fromAccount].curve,
			accountIndexes[fromAccount].derivationPath,
		)

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
		const notarizedTransaction = await sign(needSignaturesFrom, fromAccount, intent)

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
		// console.log('intentHash', intentHash.id)

		return notarizedTransaction.intentHashHex()
	}

	return useCallback(sendTransaction, [networkId, accountIndexes, confirm])
}
