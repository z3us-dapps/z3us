/* eslint-disable no-case-declarations */
import BigNumber from 'bignumber.js'
import {
	ResourceIdentifier,
	AccountAddress,
	IntendedTransferTokens,
	BuiltTransactionReadyToSign,
	ActionType as ApplicationActionType,
	AccountT,
} from '@radixdlt/application'
import { FLOOP_RRI, XRD_RRI, Z3US_FEE_RATIO, Z3US_RRI, Z3US_WALLET_MAIN, Z3US_WALLET_BURN } from '@src/config'
import { RawAction, Pool, PoolType, Token, TokenAmount, IntendedAction, ActionType, SwapError } from '@src/types'
import { buildAmount } from '@src/utils/radix'
import { getSwapError } from '@src/utils/get-swap-error'
import {
	parseAccountAddress,
	parseAmount,
	parseResourceIdentifier,
	parseValidatorAddress,
} from '@src/services/radix/serializer'
import oci from '@src/services/oci'
import astrolescent from '@src/services/astrolescent'
import doge, { QuoteQuery } from '@src/services/dogecubex'
import { swapInputTooLow } from '@src/errors'

const zero = new BigNumber(0)
const one = new BigNumber(1)
const caviarNetworkFee = one.dividedBy(10)

export type Quote = {
	amount: BigNumber
	receive: BigNumber
	fee: BigNumber
	transactionData?: {
		actions: Array<RawAction>
		message: string
	}
}

export const getZ3USFees = (
	amount: BigNumber,
	burn: boolean,
	liquidBalances: TokenAmount[],
): {
	amount: BigNumber
	fee: BigNumber
	burn: BigNumber
} => {
	if (amount.eq(0)) {
		return {
			amount: zero,
			fee: zero,
			burn: zero,
		}
	}

	let fee = amount.multipliedBy(Z3US_FEE_RATIO)
	let burnAmount = zero

	if (burn) {
		const z3usToken = liquidBalances?.find(balance => balance.rri === Z3US_RRI)
		const z3usBalance = z3usToken ? new BigNumber(z3usToken.amount).shiftedBy(-18) : new BigNumber(0)
		if (z3usBalance.gte(fee)) {
			burnAmount = fee
			fee = zero
		} else {
			burnAmount = zero.plus(z3usBalance)
			fee = fee.minus(z3usBalance)
		}
	}
	amount = amount.minus(fee)

	return {
		amount,
		fee,
		burn: burnAmount,
	}
}

export const calculatePoolFeesFromAmount = async (
	pools: Pool[],
	pool: Pool,
	amount: BigNumber,
	slippage: number,
	from: Token,
	to: Token,
	accountAddress: string,
	liquidBalances: TokenAmount[],
): Promise<Quote> => {
	let transactionData
	let receive = zero
	let fee = zero

	if (!pool?.wallet || !from || !to || amount.lte(0)) {
		return {
			amount,
			fee,
			receive,
		}
	}

	switch (pool.type) {
		case PoolType.OCI:
			const ociQuote = await oci.calculateSwapFromAmount(from.rri, to.rri, amount, slippage)
			const ociLiquidityFee = new BigNumber(ociQuote?.fee_liquidity_provider[0]?.amount || 0)
			const ociExchangeFee = new BigNumber(ociQuote?.fee_exchange[0]?.amount || 0)

			fee = ociLiquidityFee.plus(ociExchangeFee)
			receive = ociQuote?.minimum_output ? new BigNumber(ociQuote?.minimum_output?.amount || 0) : receive
			break
		case PoolType.ASTROLESCENT:
			const astrolescentQuote = await astrolescent.getSwap(accountAddress, from.rri, to.rri, amount, 'in')

			fee = new BigNumber(astrolescentQuote.swapFee || 0)
			receive = astrolescentQuote?.outputTokens ? new BigNumber(astrolescentQuote?.outputTokens || 0) : receive
			transactionData = astrolescentQuote.transactionData
			break
		case PoolType.CAVIAR:
			const floopToken = liquidBalances?.find(balance => balance.rri === FLOOP_RRI)
			const floopBalance = floopToken ? new BigNumber(floopToken.amount).shiftedBy(-18) : new BigNumber(0)

			const caviarPool = pools.find(cp => cp.wallet === pool.wallet)
			const balanceXRD = new BigNumber(caviarPool?.balances[XRD_RRI] || 0).shiftedBy(-18)
			const fromBalance = new BigNumber(caviarPool?.balances[from.rri] || 0).shiftedBy(-18)
			const toBalance = new BigNumber(caviarPool?.balances[to.rri] || 0).shiftedBy(-18)

			const midPrice = toBalance.dividedBy(balanceXRD)
			const constant = fromBalance.multipliedBy(toBalance)
			const networkFee = caviarNetworkFee.multipliedBy(midPrice)

			const newToBalance = constant.dividedBy(fromBalance.plus(amount))
			const amountTo = toBalance.minus(newToBalance)

			if (floopBalance.gt(0)) {
				if (floopBalance.gte(1)) {
					fee = amount.multipliedBy(1 / 1000)
				} else {
					fee = amount.multipliedBy(one.minus(floopBalance).multipliedBy(0.009).plus(0.01))
				}
			} else {
				fee = amount.multipliedBy(1 / 100)
			}

			receive = amountTo.multipliedBy(one.minus(fee)).minus(networkFee)
			break
		case PoolType.DOGECUBEX:
			const query: QuoteQuery = {
				from: from.symbol.toUpperCase(),
				to: to.symbol.toUpperCase(),
				maxSlippage: `${slippage * 100}`,
				amountFrom: amount.toString(),
				amountTo: null,
			}
			const dogeQuote = await doge.getQuote(query)
			amount = new BigNumber(dogeQuote?.sentAmount || 0)
			receive = new BigNumber(dogeQuote?.receivedAmount || 0)
			fee = amount.multipliedBy(11 / 1000)
			break
		default:
			throw new Error(`Invalid pool: ${pool.name} - ${pool.type}`)
	}

	if (receive.lt(0)) {
		throw swapInputTooLow
	}

	return {
		amount,
		fee,
		receive,
		transactionData,
	}
}

export const calculatePoolFeesFromReceive = async (
	pools: Pool[],
	pool: Pool,
	receive: BigNumber,
	slippage: number,
	from: Token,
	to: Token,
	accountAddress: string,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	liquidBalances: TokenAmount[],
): Promise<Quote> => {
	let transactionData
	let amount = zero
	let fee = zero

	if (!pool?.wallet || !from || !to || receive.lte(0)) {
		return {
			receive,
			fee,
			amount,
		}
	}

	switch (pool.type) {
		case PoolType.OCI:
			const ociQuote = await oci.calculateSwapFromRecieve(from.rri, to.rri, receive, slippage)
			const ociLiquidityFee = new BigNumber(ociQuote?.fee_liquidity_provider[0]?.amount || 0)
			const ociExchangeFee = new BigNumber(ociQuote?.fee_exchange[0]?.amount || 0)

			fee = ociLiquidityFee.plus(ociExchangeFee)
			amount = ociQuote?.input ? new BigNumber(ociQuote?.input.amount || 0) : amount
			break
		case PoolType.ASTROLESCENT:
			const astrolescentQuote = await astrolescent.getSwap(accountAddress, from.rri, to.rri, receive, 'out')

			fee = new BigNumber(astrolescentQuote.swapFee || 0)
			amount = astrolescentQuote?.inputTokens ? new BigNumber(astrolescentQuote?.inputTokens || 0) : amount
			transactionData = astrolescentQuote.transactionData
			break
		case PoolType.CAVIAR:
			amount = zero // @TODO: fix
			break
		case PoolType.DOGECUBEX:
			const query: QuoteQuery = {
				from: from.symbol.toUpperCase(),
				to: to.symbol.toUpperCase(),
				maxSlippage: `${slippage * 100}`,
				amountFrom: null,
				amountTo: receive.toString(),
			}
			const dogeQuote = await doge.getQuote(query)
			amount = new BigNumber(dogeQuote?.sentAmount || 0)
			receive = new BigNumber(dogeQuote?.receivedAmount || 0)
			fee = amount.multipliedBy(11 / 1000)
			break
		default:
			throw new Error(`Invalid pool: ${pool.name} - ${pool.type}`)
	}

	return {
		amount,
		fee,
		receive,
		transactionData,
	}
}

export const calculateCheapestPoolFeesFromAmount = async (
	pools: Pool[],
	amount: BigNumber,
	slippage: number,
	from: Token,
	to: Token,
	accountAddress: string,
	liquidBalances: TokenAmount[],
): Promise<{ pool: Pool } & Quote> => {
	let pool: Pool
	let cheapest
	const results = await Promise.all(
		pools.map(async p => {
			try {
				return await calculatePoolFeesFromAmount(pools, p, amount, slippage, from, to, accountAddress, liquidBalances)
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				return null
			}
		}),
	)
	results
		.filter(result => !!result)
		.forEach((cost, index) => {
			if (!cheapest || cost.receive.gt(cheapest.receive)) {
				cheapest = cost
				pool = pools[index]
			}
		})
	return { receive: zero, fee: zero, amount: zero, ...cheapest, pool }
}

export const calculateCheapestPoolFeesFromReceive = async (
	pools: Pool[],
	receive: BigNumber,
	slippage: number,
	from: Token,
	to: Token,
	accountAddress: string,
	liquidBalances: TokenAmount[],
): Promise<{ pool: Pool } & Quote> => {
	let pool: Pool | null = null
	let cheapest
	const results = await Promise.all(
		pools.map(async p => {
			try {
				return await calculatePoolFeesFromReceive(pools, p, receive, slippage, from, to, accountAddress, liquidBalances)
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				return null
			}
		}),
	)
	results
		.filter(result => !!result)
		.forEach((cost, index) => {
			if (cost.amount.eq(0)) return
			if (!cheapest || cost.amount.lt(cheapest.amount)) {
				cheapest = cost
				pool = pools[index]
			}
		})
	return { receive: zero, fee: zero, amount: zero, ...cheapest, pool }
}

const actionTypeToIndentedActionType = {
	[ActionType.TRANSFER_TOKENS]: ApplicationActionType.TOKEN_TRANSFER,
	[ActionType.STAKE_TOKENS]: ApplicationActionType.STAKE_TOKENS,
	[ActionType.UNSTAKE_TOKENS]: ApplicationActionType.UNSTAKE_TOKENS,
	// [ActionType.CREATE_TOKEN]: ExtendedActionType.CREATE_TOKEN,
	// [ActionType.MINT_TOKENS]: ExtendedActionType.MINT_TOKENS,
	// [ActionType.BURN_TOKENS]: ExtendedActionType.BURN_TOKENS,
}

export const calculateTransactionFee = async (
	pool: Pool,
	fromToken: Token,
	toToken: Token,
	amount: BigNumber,
	recieve: BigNumber,
	z3usFee: BigNumber,
	z3usBurn: BigNumber,
	minimum: boolean,
	// @TODO: type these
	buildTransactionFromActions: any,
	createMessage: any,
	account: AccountT,
	transactionData?: {
		actions: Array<RawAction>
		message: string
	},
): Promise<{
	transaction: BuiltTransactionReadyToSign | null
	fee: BigNumber
	transactionFeeError: SwapError
}> => {
	let transaction = null
	let fee = new BigNumber(0)
	let transactionFeeError = null

	if (amount.eq(0) || !pool?.wallet || !fromToken?.rri || !toToken?.rri) {
		return { transaction, fee, transactionFeeError }
	}

	try {
		const rriResult = ResourceIdentifier.fromUnsafe(fromToken.rri)
		if (rriResult.isErr()) {
			throw rriResult.error
		}

		const actions = []
		let plainText: string
		switch (pool.type) {
			case PoolType.OCI:
				plainText = toToken.symbol.toUpperCase()
				if (minimum) {
					plainText = `${recieve.toString()} ${plainText}`
				}
				break
			case PoolType.CAVIAR:
				plainText = toToken.symbol.toUpperCase()
				if (minimum) {
					plainText = `MIN ${recieve.toString()} ${plainText}`
				}
				break
			case PoolType.DOGECUBEX:
				if (minimum) {
					plainText = `>${recieve.toString()}`
				}
				break
			case PoolType.ASTROLESCENT:
				if (transactionData) {
					actions.push(
						...transactionData.actions.map(
							(action): IntendedAction => ({
								type: actionTypeToIndentedActionType[action.type],
								from_account: action?.from_account?.address
									? parseAccountAddress(action.from_account.address)
									: undefined,
								to_account: action?.to_account?.address ? parseAccountAddress(action.to_account.address) : undefined,
								from_validator: action?.from_validator?.address
									? parseValidatorAddress(action.from_validator.address)
									: undefined,
								to_validator: action?.to_validator?.address
									? parseValidatorAddress(action.to_validator.address)
									: undefined,
								amount: action?.amount?.value ? parseAmount(action.amount.value) : undefined,
								rri: action?.amount?.token_identifier?.rri
									? parseResourceIdentifier(action.amount.token_identifier.rri)
									: undefined,
							}),
						),
					)
					plainText = transactionData.message
				}
				break
			default:
				throw new Error(`Invalid pool: ${pool.name} - ${pool.type}`)
		}

		if (z3usBurn.gt(0)) {
			const actionResult = IntendedTransferTokens.create(
				{
					to_account: Z3US_WALLET_BURN,
					amount: buildAmount(z3usBurn),
					tokenIdentifier: Z3US_RRI,
				},
				account.address,
			)
			if (actionResult.isErr()) {
				throw actionResult.error
			}
			actions.push(actionResult.value)
		}

		if (z3usFee.gt(0)) {
			const actionResult = IntendedTransferTokens.create(
				{
					to_account: Z3US_WALLET_MAIN,
					amount: buildAmount(z3usFee),
					tokenIdentifier: rriResult.value,
				},
				account.address,
			)
			if (actionResult.isErr()) {
				throw actionResult.error
			}
			actions.push(actionResult.value)
		}

		if (pool.type !== PoolType.ASTROLESCENT) {
			const toResult = AccountAddress.fromUnsafe(pool.wallet)
			if (toResult.isErr()) {
				throw toResult.error
			}

			const actionResult = IntendedTransferTokens.create(
				{
					to_account: toResult.value,
					amount: buildAmount(amount),
					tokenIdentifier: rriResult.value,
				},
				account.address,
			)
			if (actionResult.isErr()) {
				throw actionResult.error
			}
			actions.push(actionResult.value)
		}

		let message: string
		if (plainText) {
			message = await createMessage(plainText)
		}

		const { transaction: builtTransaction, fee: builtFee } = await buildTransactionFromActions(actions, message)

		transaction = builtTransaction
		fee = new BigNumber(builtFee).shiftedBy(-18)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
		const errorMessageStr = (error?.message || error).toString().trim()
		const errorType = getSwapError(errorMessageStr)
		if (errorType) {
			transactionFeeError = errorType
		}
	}

	return { transaction, fee, transactionFeeError }
}
