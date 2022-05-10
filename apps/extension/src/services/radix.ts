import { SignedTransaction, Network, ActionType } from '@radixdlt/application'
import { ExtendedActionType, IntendedAction } from '@src/types'
import {
	AccountBalancesResponse,
	AccountStakesResponse,
	AccountTransactionsResponse,
	AccountUnstakesResponse,
	apiVersion,
	GatewayResponse,
	TokenDeriveResponse,
	TokenNativeResponse,
	TokenResponse,
	TransactionBuildResponse,
	TransactionFinalizeResponse,
	TransactionStatusResponse,
	TransactionSubmitResponse,
	ValidatorResponse,
	ValidatorsResponse,
} from '@radixdlt/networking'
import { generateId } from '@src/utils/generate-id'
import {
	handleAccountBalancesResponse,
	handleAccountTransactionsResponse,
	handleBuildTransactionResponse,
	handleFinalizeTransactionResponse,
	handleGatewayResponse,
	handleNativeTokenResponse,
	handleStakePositionsResponse,
	handleSubmitTransactionResponse,
	handleTokenInfoResponse,
	handleTransactionResponse,
	handleUnstakePositionsResponse,
	handleValidatorResponse,
	handleValidatorsResponse,
} from './radix/response'
import {
	parseAccountAddress,
	parseResourceIdentifier,
	parseTransactionIdentifier,
	parseValidatorAddress,
} from './radix/serializer'

export class RadixService {
	private networkURL: string

	private options: RequestInit = {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'X-Radixdlt-Target-Gw-Api': apiVersion,
		},
	}

	constructor(networkURL: URL) {
		this.networkURL = networkURL.toString()
		if (this.networkURL[this.networkURL.length - 1] === '/') {
			this.networkURL = this.networkURL.substring(0, this.networkURL.length - 1)
		}
	}

	gateway = async () => {
		const response = await this.fetch<GatewayResponse>('gateway', null)
		return handleGatewayResponse(response)
	}

	validators = async (network: Network) => {
		const body = {
			network_identifier: { network },
		}
		const response = await this.fetch<ValidatorsResponse>('validators', body)
		return handleValidatorsResponse(response)
	}

	lookupValidator = async (v: string) => {
		const address = parseValidatorAddress(v)
		const body = {
			network_identifier: { network: address.network },
			validator_identifier: {
				address: address.toString(),
			},
		}
		const response = await this.fetch<ValidatorResponse>('validator', body)
		return handleValidatorResponse(response)
	}

	nativeToken = async (network: Network) => {
		const body = {
			network_identifier: { network },
		}
		const response = await this.fetch<TokenNativeResponse>('token/native', body)
		return handleNativeTokenResponse(response)
	}

	tokenDerive = async (network: Network, symbol: string, publicKeyHex: string) => {
		const body = {
			network_identifier: { network },
			public_key: { hex: publicKeyHex },
			symbol,
		}
		const response = await this.fetch<TokenDeriveResponse>('token/derive', body)
		return response.token_identifier.rri
	}

	tokenInfo = async (v: string) => {
		const rri = parseResourceIdentifier(v)
		const body = {
			network_identifier: { network: rri.network },
			token_identifier: {
				rri: rri.toString(),
			},
		}
		const response = await this.fetch<TokenResponse>('token', body)
		return handleTokenInfoResponse(response)
	}

	tokenBalancesForAddress = async (v: string) => {
		const address = parseAccountAddress(v)
		const body = {
			network_identifier: { network: address.network },
			account_identifier: {
				address: address.toString(),
			},
		}
		const response = await this.fetch<AccountBalancesResponse>('account/balances', body)
		return handleAccountBalancesResponse(response)
	}

	stakesForAddress = async (v: string) => {
		const address = parseAccountAddress(v)
		const body = {
			network_identifier: { network: address.network },
			account_identifier: {
				address: address.toString(),
			},
		}
		const response = await this.fetch<AccountStakesResponse>('account/stakes', body)
		return handleStakePositionsResponse(response)
	}

	unstakesForAddress = async (v: string) => {
		const address = parseAccountAddress(v)
		const body = {
			network_identifier: { network: address.network },
			account_identifier: {
				address: address.toString(),
			},
		}
		const response = await this.fetch<AccountUnstakesResponse>('account/unstakes', body)
		return handleUnstakePositionsResponse(response)
	}

	transactionHistory = async (v: string, size = 25, cursor?: string) => {
		const address = parseAccountAddress(v)
		const body = {
			account_identifier: {
				address: address.toString(),
			},
			network_identifier: { network: address.network },
			limit: size,
			cursor,
		}
		const response = await this.fetch<AccountTransactionsResponse>('account/transactions', body)
		return handleAccountTransactionsResponse(response)
	}

	transactionStatus = async (network: Network, v: string) => {
		const txID = parseTransactionIdentifier(v)
		const body = {
			network_identifier: { network },
			transaction_identifier: {
				hash: txID.toString(),
			},
		}
		const response = await this.fetch<TransactionStatusResponse>('transaction/status', body)
		return handleTransactionResponse(response)
	}

	buildRawTransaction = async (body: any) => {
		const response = await this.fetch<TransactionBuildResponse>('transaction/build', body)
		return handleBuildTransactionResponse(response)
	}

	buildTransaction = (v: string, actions: IntendedAction[], message?: Buffer) => {
		const from = parseAccountAddress(v)

		let disableTokenMintAndBurn = true

		return this.buildRawTransaction({
			network_identifier: { network: from.network },
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
				address: from.toString(),
			},
			message: message ? message.toString('hex') : undefined,
			disable_token_mint_and_burn: disableTokenMintAndBurn,
		})
	}

	finalizeTransaction = async (network: Network, signedTransaction: SignedTransaction) => {
		const body = {
			network_identifier: { network },
			unsigned_transaction: signedTransaction.transaction.blob,
			signature: {
				bytes: signedTransaction.signature.toDER(),
				public_key: {
					hex: signedTransaction.publicKeyOfSigner.toString(),
				},
			},
		}
		const response = await this.fetch<TransactionFinalizeResponse>('transaction/finalize', body)
		return handleFinalizeTransactionResponse(response)
	}

	submitSignedTransaction = async (network: Network, signedTx: string) => {
		const body = {
			network_identifier: { network },
			signed_transaction: signedTx,
		}
		const response = await this.fetch<TransactionSubmitResponse>('transaction/submit', body)
		return handleSubmitTransactionResponse(response)
	}

	private generateOptions = (path: string): RequestInit => ({
		...this.options,
		headers: {
			...this.options.headers,
			'X-Radixdlt-Method': path,
			'X-Radixdlt-Correlation-Id': generateId(),
		},
	})

	private fetch = async <T>(path: string, body: any) => {
		const response = await fetch(`${this.networkURL}/${path}`, {
			...this.generateOptions(path),
			body: JSON.stringify(body || {}),
		})
		const data = await response.json()

		if (response.status !== 200) {
			if (data?.message) throw new Error(data?.message)
			throw new Error(`Failed gateway API request: ${response.statusText} (${response.text()})`)
		}

		return data as T
	}
}
