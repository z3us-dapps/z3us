/* eslint-disable no-case-declarations */
import BigNumber from 'bignumber.js'
import { IntendedTransferTokens, BuiltTransactionReadyToSign, AccountT } from '@radixdlt/application'
import { FLOOP_RRI, Z3US_FEE_RATIO, Z3US_RRI, Z3US_WALLET_MAIN, Z3US_WALLET_BURN } from '@src/config'
import { Pool, PoolType, Token, TokenAmount, IntendedAction } from '@src/types'
import { buildAmount } from '@src/utils/radix'
import { parseAccountAddress, parseAmount, parseResourceIdentifier } from '@src/services/radix/serializer'
import oci from '@src/services/oci'
import doge, { QuoteQuery } from '@src/services/dogecubex'
import astrolescent, { SwapResponse as AstrolescentSwapResponse } from '@src/services/astrolescent'
import dsor, { SwapResponse as DsorSwapResponse } from '@src/services/dsor'
import { calculateSwap } from '@src/services//caviar'

const zero = new BigNumber(0)

export type Quote = {
	amount: BigNumber
	receive: BigNumber
	fee: BigNumber
	response: any
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
		const z3usBalance = z3usToken ? new BigNumber(z3usToken.amount).shiftedBy(-18) : zero
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
	let response
	let receive = zero
	let fee = zero

	if (!pool?.wallet || !from || !to || amount.lte(0)) {
		return {
			amount,
			fee,
			receive,
			response,
		}
	}

	switch (pool.type) {
		case PoolType.OCI:
			const ociQuote = await oci.calculateSwapFromAmount(from.rri, to.rri, amount, slippage)
			const ociLiquidityFee = new BigNumber(ociQuote?.fee_liquidity_provider[0]?.amount || 0)
			const ociExchangeFee = new BigNumber(ociQuote?.fee_exchange[0]?.amount || 0)

			fee = ociLiquidityFee.plus(ociExchangeFee)
			receive = ociQuote?.minimum_output ? new BigNumber(ociQuote?.minimum_output?.amount || 0) : receive
			response = ociQuote
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
			response = dogeQuote
			break
		case PoolType.ASTROLESCENT:
			const astrolescentQuote = await astrolescent.getSwap(accountAddress, from.rri, to.rri, amount, 'in')

			fee = new BigNumber(astrolescentQuote.swapFee).shiftedBy(-18)
			receive = astrolescentQuote?.outputTokens ? new BigNumber(astrolescentQuote?.outputTokens || 0) : receive
			response = astrolescentQuote
			break
		case PoolType.DSOR:
			const dsorQuote = await dsor.getSwap({
				lhs_rri: from.rri,
				rhs_rri: to.rri,
				lhs_amount: buildAmount(amount).toString(),
			})

			fee = zero // @TODO
			receive = dsorQuote?.rhs_amount ? new BigNumber(dsorQuote?.rhs_amount || 0).shiftedBy(-18) : receive
			response = dsorQuote
			break
		case PoolType.CAVIAR:
			const floopToken = liquidBalances?.find(balance => balance.rri === FLOOP_RRI)
			const floopBalance = floopToken ? new BigNumber(floopToken.amount).shiftedBy(-18) : zero

			const caviarQuote = calculateSwap(pools, pool, amount, from, to, floopBalance)

			receive = caviarQuote.receive
			fee = caviarQuote.fee
			response = caviarQuote
			break
		default:
			throw new Error(`Invalid pool: ${pool.name} - ${pool.type}`)
	}

	if (receive.lt(0)) {
		throw new Error('Input too high')
	}

	return {
		amount,
		fee,
		receive,
		response,
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
	let response
	let amount = zero
	let fee = zero

	if (!pool?.wallet || !from || !to || receive.lte(0)) {
		return {
			receive,
			fee,
			amount,
			response,
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
			response = dogeQuote
			break
		case PoolType.ASTROLESCENT:
			const astrolescentQuote = await astrolescent.getSwap(accountAddress, from.rri, to.rri, receive, 'out')

			fee = new BigNumber(astrolescentQuote.swapFee).shiftedBy(-18)
			amount = astrolescentQuote?.inputTokens ? new BigNumber(astrolescentQuote?.inputTokens || 0) : amount
			response = astrolescentQuote
			break
		case PoolType.DSOR:
			const dsorQuote = await dsor.getSwap({
				lhs_rri: from.rri,
				rhs_rri: to.rri,
				rhs_amount: buildAmount(receive).toString(),
			})

			fee = zero // @TODO
			receive = dsorQuote?.lhs_amount ? new BigNumber(dsorQuote?.lhs_amount || 0).shiftedBy(-18) : receive
			response = dsorQuote
			break
		case PoolType.CAVIAR:
			amount = zero // @TODO: unsupported
			response = null
			break
		default:
			throw new Error(`Invalid pool: ${pool.name} - ${pool.type}`)
	}

	return {
		amount,
		fee,
		receive,
		response,
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
	response?: any,
): Promise<{
	transaction: BuiltTransactionReadyToSign | null
	fee: BigNumber
	transactionFeeError: string
}> => {
	let transaction = null
	let fee = zero
	let transactionFeeError = null

	if (amount.eq(0) || !pool?.wallet || !fromToken?.rri || !toToken?.rri) {
		return { transaction, fee, transactionFeeError }
	}

	try {
		const fromRRI = parseResourceIdentifier(fromToken.rri)
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
				if (!response) throw new Error(`${pool.name} - ${pool.type}: missing swap response: ${response}`)
				plainText = (response as AstrolescentSwapResponse).transactionData.message
				break
			case PoolType.DSOR:
				if (!response) throw new Error(`${pool.name} - ${pool.type}: missing swap response: ${response}`)
				plainText = (response as DsorSwapResponse).message
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
					tokenIdentifier: fromRRI,
				},
				account.address,
			)
			if (actionResult.isErr()) {
				throw actionResult.error
			}
			actions.push(actionResult.value)
		}

		switch (pool.type) {
			case PoolType.ASTROLESCENT:
				if (!response) throw new Error(`${pool.name} - ${pool.type}: missing swap response: ${response}`)
				const astrolescentResponse = response as AstrolescentSwapResponse
				actions.push(
					...astrolescentResponse.transactionData.actions.map((action): IntendedAction => {
						const actionResult = IntendedTransferTokens.create(
							{
								to_account: parseAccountAddress(action.to_account.address),
								amount: parseAmount(action.amount.value),
								tokenIdentifier: parseResourceIdentifier(action.amount.token_identifier.rri),
							},
							parseAccountAddress(action.from_account.address),
						)
						if (actionResult.isErr()) {
							throw actionResult.error
						}
						return actionResult.value
					}),
				)
				break
			case PoolType.DSOR:
				if (!response) throw new Error(`${pool.name} - ${pool.type}: missing swap response: ${response}`)
				const dsorResponse = response as DsorSwapResponse
				actions.push(
					...dsorResponse.actions.map((action): IntendedAction => {
						const actionResult = IntendedTransferTokens.create(
							{
								to_account: parseAccountAddress(action.wallet_address),
								amount: parseAmount(action.lhs_amount),
								tokenIdentifier: parseResourceIdentifier(action.lhs_rri),
							},
							account.address,
						)
						if (actionResult.isErr()) {
							throw actionResult.error
						}
						return actionResult.value
					}),
				)
				break
			default:
				const actionResult = IntendedTransferTokens.create(
					{
						to_account: parseAccountAddress(pool.wallet),
						amount: buildAmount(amount),
						tokenIdentifier: fromRRI,
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
		transactionFeeError = (error?.message || error).toString().trim()
	}

	return { transaction, fee, transactionFeeError }
}
