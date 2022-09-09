import { SignedTransaction, Network } from '@radixdlt/application'
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

	buildTransaction = async (body: any) => {
		const response = await this.fetch<TransactionBuildResponse>('transaction/build', body)
		return handleBuildTransactionResponse(response)
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
			switch (data?.details?.type) {
				case 'NetworkNotSupportedError':
					throw new Error('Network not supported')
				case 'InvalidSignatureError':
					throw new Error('Invalid signature')
				case 'InvalidTransactionError':
					throw new Error('Invalid transaction')
				case 'InvalidTokenRRIError':
					throw new Error('Invalid token')
				case 'InvalidAccountAddressError':
					throw new Error('Invalid account address')
				case 'InvalidValidatorAddressError':
					throw new Error('Invalid validator address')
				case 'InvalidPublicKeyError':
					throw new Error('Invalid public key')
				case 'InvalidTokenSymbolError':
					throw new Error('Invalid token symbol')
				case 'InvalidActionError':
					throw new Error('Invalid action')
				case 'TokenNotFoundError':
					throw new Error('Token not found')
				case 'TransactionNotFoundError':
					throw new Error('Transaction not found')
				case 'NotEnoughNativeTokensForFeesError':
					throw new Error('Not enough XRDs for fees')
				case 'NotEnoughTokensForTransferError':
					throw new Error('Not enough tokens for transfer')
				case 'NotEnoughTokensForStakeError':
					throw new Error('Not enough tokens for stake')
				case 'NotEnoughTokensForUnstakeError':
					throw new Error('Not enough tokens for unstake')
				case 'BelowMinimumStakeError':
					throw new Error('Below minimum stake')
				case 'CannotStakeError':
					throw new Error('Cannot stake')
				case 'MessageTooLongError':
					throw new Error('Message too long')
				case 'CouldNotConstructFeesError':
					throw new Error('Failed to construct fees')
				default:
					if (data?.message) throw new Error(data?.message)
					throw new Error(`Failed gateway API request: ${response.statusText} (${response.text()})`)
			}
		}

		return data as T
	}
}
