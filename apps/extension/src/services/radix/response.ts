import type { Network } from '@radixdlt/application'
import type {
	AccountBalancesResponse,
	AccountStakeEntry,
	AccountStakesResponse,
	AccountTransactionsResponse,
	AccountUnstakeEntry,
	AccountUnstakesResponse,
	GatewayResponse,
	TokenNativeResponse,
	TokenResponse,
	TransactionBuildResponse,
	TransactionFinalizeResponse,
	TransactionStatusResponse,
	TransactionSubmitResponse,
	ValidatorResponse,
	ValidatorsResponse,
} from '@radixdlt/networking'

import { parseToken, parseTokenAmount, parseTx, parseValidator } from './serializer'

export const handleGatewayResponse = (response: GatewayResponse) => ({
	network: response.network_identifier.network as Network,
})

export const handleValidatorResponse = (response: ValidatorResponse) => parseValidator(response.validator)

export const handleValidatorsResponse = (response: ValidatorsResponse) => response.validators.map(parseValidator)

export const handleNativeTokenResponse = (response: TokenNativeResponse) => parseToken(response)

export const handleTokenInfoResponse = (response: TokenResponse) => parseToken(response)

export const handleAccountBalancesResponse = (response: AccountBalancesResponse) => ({
	ledger_state: {
		...response.ledger_state,
		timestamp: new Date(response.ledger_state.timestamp),
	},
	account_balances: {
		...response.account_balances,
		liquid_balances: response.account_balances.liquid_balances.map(parseTokenAmount).sort((a, b) => a.order - b.order),
	},
})

const transformStakeEntry = (unstake: AccountStakeEntry) => ({
	validator: unstake.validator_identifier.address,
	amount: unstake.delegated_stake.value,
})

export const handleStakePositionsResponse = (response: AccountStakesResponse) => ({
	stakes: response.stakes.map(transformStakeEntry),
	pendingStakes: response.pending_stakes.map(transformStakeEntry),
})

const transformUnstakeEntry = (unstake: AccountUnstakeEntry) => ({
	validator: unstake.validator_identifier.address,
	amount: unstake.unstaking_amount.value,
	epochsUntil: unstake.epochs_until_unlocked,
})

export const handleUnstakePositionsResponse = (response: AccountUnstakesResponse) => ({
	unstakes: response.unstakes.map(transformUnstakeEntry),
	pendingUnstakes: response.pending_unstakes.map(transformUnstakeEntry),
})

export const handleAccountTransactionsResponse = (response: AccountTransactionsResponse) => ({
	cursor: response.next_cursor as string,
	transactions: response.transactions.map(parseTx),
})

export const handleTransactionResponse = (response: TransactionStatusResponse) => parseTx(response.transaction)

export const handleBuildTransactionResponse = (response: TransactionBuildResponse) => ({
	transaction: {
		blob: response.transaction_build.unsigned_transaction,
		hashOfBlobToSign: response.transaction_build.payload_to_sign,
	},
	fee: response.transaction_build.fee.value,
})

export const handleFinalizeTransactionResponse = (response: TransactionFinalizeResponse) => ({
	blob: response.signed_transaction,
	txID: response.transaction_identifier.hash,
})

export const handleSubmitTransactionResponse = (response: TransactionSubmitResponse) => ({
	txID: response.transaction_identifier.hash,
})
