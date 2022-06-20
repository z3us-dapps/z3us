import { useCallback } from 'react'
import { ActionType } from '@radixdlt/application'
import { useStore } from '@src/store'
import { useRadix } from '@src/hooks/use-radix'
import { useSignature } from '@src/hooks/use-signature'
import { ExtendedActionType, IntendedAction } from '@src/types'
import { randomBytes } from 'crypto'
import { compile_with_nonce } from 'pte-manifest-compiler'
import { Configuration, DefaultApi, ManifestBuilder } from 'pte-sdk'
import { ec as Elliptic } from 'elliptic'

const p256 = new Elliptic('p256')

const submitPTETransaction = async (body: any) => {
	const response = await fetch(`https://pte01.radixdlt.com/transaction`, {
		method: 'POST',
		body: JSON.stringify(body || {}),
	})
	const data = await response.json()

	if (response.status !== 200) {
		if (data?.message) throw new Error(data?.message)
		throw new Error(`Failed gateway API request: ${response.statusText} (${response.text()})`)
	}
	return response.json()
}

export const useTransaction = () => {
	const radix = useRadix()
	const { sign, verify } = useSignature()
	const { account } = useStore(state => ({
		account: state.account,
	}))

	const buildTransaction = useCallback((payload: any) => radix.buildTransaction(payload), [radix])

	const buildTransactionFromManifest = useCallback(
		async (manifest: string, nonce: number = randomBytes(4).readUInt32LE()) => {
			const transaction = compile_with_nonce(manifest, BigInt(nonce))
			const paylaod = Buffer.from(transaction)

			const api = new DefaultApi(
				new Configuration({
					basePath: 'https://pte01.radixdlt.com',
				}),
			)

			const publicKey = p256.keyFromPublic(account.publicKey.asData({ compressed: true })).getPublic(false, 'hex')
			const receipt = await api.submitTransaction({
				transaction: {
					manifest: new ManifestBuilder().newAccount(publicKey).build().toString(),
					nonce: await api.getNonce({ signers: [publicKey] }),
					signatures: [],
				},
			})
			const address = receipt.newComponents[0]
			console.log(address)

			const signature = await sign(paylaod)
			if (!verify(signature, paylaod)) {
				throw new Error('Invalid signature')
			}

			return submitPTETransaction({
				transaction: {
					manifest,
					nonce,
					signatures: [{ publicKey, signature }],
				},
			})
		},
		[radix, account, sign, verify],
	)

	const buildTransactionFromActions = useCallback(
		(actions: IntendedAction[], message?: string) => {
			let disableTokenMintAndBurn = true
			return radix.buildTransaction({
				network_identifier: { network: account.address.network },
				actions: actions.map(action => {
					switch (action.type) {
						case ActionType.TOKEN_TRANSFER:
							return {
								type: 'TransferTokens',
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
								type: 'StakeTokens',
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
								type: 'UnstakeTokens',
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
								type: 'CreateTokenDefinition',
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
								type: 'MintTokens',
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
								type: 'BurnTokens',
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
							throw new Error(`Unknown action type`)
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
			const signature = await account.sign(transaction, nonXrdHRP).toPromise()

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
		buildTransactionFromManifest,
		signTransaction,
		submitTransaction,
	}
}
