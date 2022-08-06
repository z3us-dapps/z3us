/* eslint-disable no-case-declarations */
import { XRD_RRI, Z3US_FEE_RATIO } from '@src/config'
import { Pool, PoolType, Token } from '@src/types'
import BigNumber from 'bignumber.js'
import { CaviarPoolsResponse } from '@src/services/caviar'
import oci from '@src/services/oci'
import doge, { QuoteQuery } from '@src/services/dogecubex'

const zero = new BigNumber(0)
const one = new BigNumber(1)
const caviarNetworkFee = one.dividedBy(10)

export const getZ3USFees = (
	amount: BigNumber,
	burn: boolean,
	z3usBalance: BigNumber,
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
	pool: Pool,
	amount: BigNumber,
	from: Token,
	to: Token,
	caviarPools: CaviarPoolsResponse,
	floopBalance: BigNumber,
): Promise<{
	amount: BigNumber
	receive: BigNumber
	fee: BigNumber
}> => {
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
			const ociQuote = await oci.calculateSwapFromAmount(from.rri, to.rri, amount)
			const ociLiquidityFee = new BigNumber(ociQuote?.fee_liquidity_provider[0]?.amount || 0)
			const ociExchangeFee = new BigNumber(ociQuote?.fee_exchange[0]?.amount || 0)

			fee = ociLiquidityFee.plus(ociExchangeFee)
			receive = ociQuote?.minimum_output ? new BigNumber(ociQuote?.minimum_output?.amount || 0) : receive
			break
		case PoolType.CAVIAR:
			const caviarPool = caviarPools.find(cp => cp.wallet === pool.wallet)
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
				maxSlippage: '0',
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

	return {
		amount,
		fee,
		receive,
	}
}

export const calculatePoolFeesFromReceive = async (
	pool: Pool,
	receive: BigNumber,
	from: Token,
	to: Token,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	caviarPools: CaviarPoolsResponse,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	floopBalance: BigNumber,
): Promise<{
	amount: BigNumber
	receive: BigNumber
	fee: BigNumber
}> => {
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
			const ociQuote = await oci.calculateSwapFromRecieve(from.rri, to.rri, receive)
			const ociLiquidityFee = new BigNumber(ociQuote?.fee_liquidity_provider[0]?.amount || 0)
			const ociExchangeFee = new BigNumber(ociQuote?.fee_exchange[0]?.amount || 0)

			fee = ociLiquidityFee.plus(ociExchangeFee)
			amount = ociQuote?.input ? new BigNumber(ociQuote?.input.amount || 0) : amount
			break
		case PoolType.CAVIAR:
			amount = zero // @TODO: fix
			break
		case PoolType.DOGECUBEX:
			const query: QuoteQuery = {
				from: from.symbol.toUpperCase(),
				to: to.symbol.toUpperCase(),
				maxSlippage: '0',
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
	}
}

export const calculateCheapestPoolFeesFromAmount = async (
	pools: Pool[],
	amount: BigNumber,
	from: Token,
	to: Token,
	caviarPools: CaviarPoolsResponse,
	floopBalance: BigNumber,
): Promise<{
	pool: Pool
	amount: BigNumber
	receive: BigNumber
	fee: BigNumber
}> => {
	let pool: Pool
	let cheapest
	const results = await Promise.all(
		pools.map(async p => {
			try {
				return await calculatePoolFeesFromAmount(p, amount, from, to, caviarPools, floopBalance)
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
			if (!cheapest || cost.receive.gt(cheapest.amount)) {
				cheapest = cost
				pool = pools[index]
			}
		})
	return { receive: zero, fee: zero, amount: zero, ...cheapest, pool }
}

export const calculateCheapestPoolFeesFromReceive = async (
	pools: Pool[],
	receive: BigNumber,
	from: Token,
	to: Token,
	caviarPools: CaviarPoolsResponse,
	floopBalance: BigNumber,
): Promise<{
	pool: Pool
	amount: BigNumber
	receive: BigNumber
	fee: BigNumber
}> => {
	let pool: Pool | null = null
	let cheapest
	const results = await Promise.all(
		pools.map(async p => {
			try {
				return await calculatePoolFeesFromReceive(p, receive, from, to, caviarPools, floopBalance)
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
