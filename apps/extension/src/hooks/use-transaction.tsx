import { useCallback } from 'react'
import { firstValueFrom } from 'rxjs'
import { ActionType } from '@radixdlt/application'
import { ExtendedActionType, IntendedAction, ActionType as InternalActionType } from '@src/types'
import { useSharedStore, useStore } from '@src/store'
import { useRadix } from '@src/hooks/use-radix'
// import { useSignature } from '@src/hooks/use-signature'
// import { randomBytes } from 'crypto'
// import { compile_with_nonce } from 'pte-manifest-compiler'

export const useTransaction = () => {
	const radix = useRadix()
	// const { sign, verify } = useSignature()
	const { addConfirmWithHWToast } = useSharedStore(state => ({
		addConfirmWithHWToast: state.addConfirmWithHWToastAction,
	}))
	const { account } = useStore(state => ({
		account: state.account,
	}))

	const buildTransaction = useCallback((payload: any) => radix.buildTransaction(payload), [radix])

	// const buildTransactionFromManifest = useCallback(
	// 	async (manifest: string, nonce: number = randomBytes(4).readUInt32LE()) => {
	// 		const transaction = compile_with_nonce(manifest, BigInt(nonce))
	// 		const paylaod = Buffer.from(transaction)

	// 		const signature = await sign(paylaod)
	// 		if (!verify(signature, paylaod)) {
	// 			throw new Error('Invalid signature')
	// 		}

	// 		return radix.submitTransaction({
	// 			transaction: {
	// 				manifest,
	// 				nonce: { value: nonce },
	// 				signatures: [{ publicKey: account.publicKey.toString(), signature }],
	// 			},
	// 		})
	// 	},
	// 	[radix, account, sign, verify],
	// )

	const buildTransactionFromActions = useCallback(
		(actions: IntendedAction[], message?: string) => {
			let disableTokenMintAndBurn = true
			return radix.buildTransaction({
				network_identifier: { network: account.address.network },
				actions: actions.map(action => {
					switch (action.type) {
						case ActionType.TOKEN_TRANSFER:
							return {
								type: InternalActionType.TRANSFER_TOKENS,
								from_account: {
									address: action.from_account.toString(),
								},
								to_account: {
									address: action.to_account.toString(),
								},
								amount: {
									value: action.amount.toString(),
									token_identifier: {
										rri: action.rri.toString(),
									},
								},
							}
						case ActionType.STAKE_TOKENS:
							return {
								type: InternalActionType.STAKE_TOKENS,
								from_account: {
									address: action.from_account.toString(),
								},
								to_validator: {
									address: action.to_validator.toString(),
								},
								amount: {
									value: action.amount.toString(),
									token_identifier: {
										rri: action.rri.toString(),
									},
								},
							}
						case ActionType.UNSTAKE_TOKENS:
							return {
								type: InternalActionType.UNSTAKE_TOKENS,
								from_validator: {
									address: action.from_validator.toString(),
								},
								to_account: {
									address: action.to_account.toString(),
								},
								amount: {
									value: action.amount.toString(),
									token_identifier: {
										rri: action.rri.toString(),
									},
								},
							}
						case ExtendedActionType.CREATE_TOKEN:
							return {
								type: InternalActionType.CREATE_TOKEN,
								token_properties: {
									name: action.token.name,
									description: action.token.description,
									icon_url: action.token.icon_url,
									url: action.token.url,
									symbol: action.token.symbol,
									is_supply_mutable: action.token.is_supply_mutable,
									granularity: action.token.granularity,
									owner: {
										address: action.to_account.toString(),
									},
								},
								token_supply: {
									value: action.amount.toString(),
									token_identifier: {
										rri: action.rri.toString(),
									},
								},
								to_account: {
									address: action.to_account.toString(),
								},
							}
						case ExtendedActionType.MINT_TOKENS:
							disableTokenMintAndBurn = false
							return {
								type: InternalActionType.MINT_TOKENS,
								to_account: {
									address: action.to_account.toString(),
								},
								amount: {
									value: action.amount.toString(),
									token_identifier: {
										rri: action.rri.toString(),
									},
								},
							}
						case ExtendedActionType.BURN_TOKENS:
							disableTokenMintAndBurn = false
							return {
								type: InternalActionType.BURN_TOKENS,
								from_account: {
									address: action.from_account.toString(),
								},
								amount: {
									value: action.amount.toString(),
									token_identifier: {
										rri: action.rri.toString(),
									},
								},
							}
						default:
							throw new Error(`Unknown action type: ${(action as any).type}`)
					}
				}),
				fee_payer: {
					address: account.address.toString(),
				},
				message,
				disable_token_mint_and_burn: disableTokenMintAndBurn,
			})
		},
		[radix, account],
	)

	const signTransaction = useCallback(
		async (symbol: string, transaction: { blob: string; hashOfBlobToSign: string }) => {
			const rriName = symbol.toLocaleLowerCase()
			const nonXrdHRP = rriName !== 'xrd' ? rriName : undefined

			addConfirmWithHWToast()

			const signature = await firstValueFrom(account.sign(transaction, nonXrdHRP))

			return radix.finalizeTransaction(account.network, {
				transaction,
				signature,
				publicKeyOfSigner: account.publicKey,
			})
		},
		[radix, account],
	)

	const submitTransaction = useCallback(
		(signedTransaction: string) => radix.submitSignedTransaction(account.network, signedTransaction),
		[radix, account],
	)

	return {
		buildTransaction,
		buildTransactionFromActions,
		// buildTransactionFromManifest,
		signTransaction,
		submitTransaction,
	}
}
