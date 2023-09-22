import { SendTransactionInput } from '@radixdlt/radix-dapp-toolkit'
import {
	CompiledSignedTransactionIntent,
	Convert,
	InstructionsKind,
	Intent,
	SignedIntent,
	TransactionHeader,
	TransactionManifest,
	generateRandomNonce,
	rawRadixEngineToolkit,
} from '@radixdlt/radix-engine-toolkit'
// import { GeneratedConverter } from '@radixdlt/radix-engine-toolkit/dist/generated'
import { useGatewayClient } from 'packages/ui/src/hooks/dapp/use-gateway-client'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useCallback } from 'react'

import { useMessageClient } from '@src/hooks/use-message-client'

export const useSendTransaction = () => {
	const networkId = useNetworkId()
	const { status, transaction } = useGatewayClient()
	const client = useMessageClient()

	return useCallback(
		async (
			input: SendTransactionInput,
			password: string,
			fromAccountIndex: number,
			feePayerAccountIndex: number,
			tipPercentage: number = 0,
		): Promise<string> => {
			throw new Error('Missing "./dist/generated" specifier in "@radixdlt/radix-engine-toolkit" package')
			// const notaryPublicKey = await client.getPublicKey(fromAccountIndex)
			// const { ledger_state } = await status.getCurrent()
			// const validFromEpoch: number = ledger_state.epoch

			// const header: TransactionHeader = {
			// 	networkId: networkId,
			// 	startEpochInclusive: validFromEpoch,
			// 	endEpochExclusive: validFromEpoch + 10,
			// 	nonce: generateRandomNonce(),
			// 	notaryPublicKey,
			// 	notaryIsSignatory: true,
			// 	tipPercentage,
			// }

			// const manifest: TransactionManifest = {
			// 	instructions: {
			// 		kind: InstructionsKind.String,
			// 		value: input.transactionManifest,
			// 	},
			// 	blobs: input.blobs.map(blob => Convert.HexString.toUint8Array(blob)),
			// }
			// const intent: Intent = { header, manifest }
			// const retWrapper = await rawRadixEngineToolkit

			// const intentHash = GeneratedConverter.TransactionHash.fromGenerated(
			// 	retWrapper.intentHash(GeneratedConverter.Intent.toGenerated(intent)),
			// )

			// const signatures = await Promise.all(
			// 	[
			// 		async (hash: Uint8Array) => await client.signToSignatureWithPublicKey(password, hash, feePayerAccountIndex),
			// 	].map(func => func(intentHash.hash)),
			// )

			// const signedIntent: SignedIntent = { intent, intentSignatures: signatures }

			// const compiledSignedIntent = Convert.HexString.toUint8Array(
			// 	retWrapper.signedIntentCompile(GeneratedConverter.SignedIntent.toGenerated(signedIntent)),
			// )

			// const signedIntentHash = GeneratedConverter.TransactionHash.fromGenerated(
			// 	retWrapper.signedIntentHash(GeneratedConverter.SignedIntent.toGenerated(signedIntent)),
			// )

			// const notarizedTransaction = await new CompiledSignedTransactionIntent(
			// 	retWrapper,
			// 	intentHash,
			// 	signedIntent,
			// 	compiledSignedIntent,
			// 	signedIntentHash,
			// ).compileNotarizedAsync(
			// 	async (hash: Uint8Array) => await client.signToSignature(password, hash, fromAccountIndex),
			// )

			// const transactionId = notarizedTransaction.intentHashHex()

			// await transaction.innerClient.transactionSubmit({
			// 	transactionSubmitRequest: { notarized_transaction_hex: notarizedTransaction.toHex() },
			// })

			// return transactionId
		},
		[networkId],
	)
}
