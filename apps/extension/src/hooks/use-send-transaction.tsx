/* eslint-disable no-case-declarations */
import type { SendTransactionInput } from '@radixdlt/radix-dapp-toolkit'
import type {
	Curve,
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

import { signatureFromJSON, signatureWithPublicKeyFromJSON, signatureWithPublicKeyToJSON } from '@src/crypto/signature'
import { useMessageClient } from '@src/hooks/use-message-client'
import { useSignModal } from '@src/hooks/use-sign-modal'

import { useLedgerClient } from './use-ledger-client'

export function signatureCurveFromLedgerCurve(curve: 'secp256k1' | 'curve25519'): Curve {
	switch (curve) {
		case 'secp256k1':
			return 'Secp256k1'
		case 'curve25519':
			return 'Ed25519'
		default:
			throw new Error(`Unknown curve: ${curve}`)
	}
}

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

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const sign = useCallback(
		async (needSignaturesFrom: string[], password: string, hash: Uint8Array) => {
			switch (keystore?.type) {
				case KeystoreType.LOCAL:
					return Promise.all(
						needSignaturesFrom.map(idx =>
							client.signToSignatureWithPublicKey(
								accountIndexes[idx].curve,
								accountIndexes[idx].derivationPath,
								password,
								hash,
							),
						),
					)
				case KeystoreType.HARDWARE:
					const ledgerSignatures = await ledger.signTx(
						needSignaturesFrom.map(idx => accountIndexes[idx]),
						password,
						hash,
					)
					return ledgerSignatures.map(ledgerSignature =>
						signatureWithPublicKeyFromJSON({
							signature: ledgerSignature.signature,
							publicKey: ledgerSignature.derivedPublicKey.publicKey,
							curve: signatureCurveFromLedgerCurve(ledgerSignature.derivedPublicKey.curve),
						}),
					)
				default:
					throw new Error(`Can not sign with keystore type: ${keystore?.type}`)
			}
		},
		[keystore],
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
		const notaryPublicKey = await client.getPublicKey(
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
		const intentHash = await RadixEngineToolkit.Intent.intentHash(intent)

		const content = modalContent(input.transactionManifest)
		const password = await confirm(content)
		const signatures = await sign(needSignaturesFrom, password, intentHash.hash)

		const signedIntent: SignedIntent = { intent, intentSignatures: signatures }
		const signedIntentHash = await RadixEngineToolkit.SignedIntent.signedIntentHash(signedIntent)
		const compiledSignedIntent = await RadixEngineToolkit.SignedIntent.compile(signedIntent)
		const notarizedTransaction = await new CompiledSignedTransactionIntent(
			await rawRadixEngineToolkit,
			intentHash,
			signedIntent,
			compiledSignedIntent,
			signedIntentHash,
		).compileNotarizedAsync(async (hash: Uint8Array) => {
			const [signature] = await sign([fromAccount], password, hash)
			return signatureFromJSON(signatureWithPublicKeyToJSON(signature))
		})

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
