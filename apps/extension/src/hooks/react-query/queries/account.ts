import { Ticker } from '@src/types'
import { useSharedStore } from '@src/hooks/use-store'
import BigNumber from 'bignumber.js'
import { useTickers } from './tickers'
import { useAllAccountsTokenBalances, useTokenBalances, useTokenInfos } from './radix'

const accountValueLoadingState = { isLoading: true, value: new BigNumber(0), change: new BigNumber(0) }

const calculateAmountValue = (ticker: Ticker, amount: string | BigNumber): BigNumber => {
	if (amount instanceof BigNumber) {
		return amount.multipliedBy(ticker.last_price)
	}
	return new BigNumber(amount).shiftedBy(-18).multipliedBy(ticker.last_price)
}

const useGenericaccountsValue = (
	balances: Array<{
		rri: string
		amount: string | BigNumber
	}>,
	staked: string | BigNumber,
	isLoading: boolean,
) => {
	const rris = balances.map(({ rri }) => rri)
	const { currency } = useSharedStore(state => ({
		currency: state.currency,
	}))
	let tokens = useTokenInfos(rris)
	const isLoadingTokens = tokens.some(result => result.isLoading)
	tokens = tokens?.filter(({ data }) => !!data) || []

	const tickers = useTickers(
		currency,
		tokens.map(({ data }) => data.symbol),
	)
	const isLoadingTickers = tickers.some(result => result.isLoading)

	if (isLoading) {
		return accountValueLoadingState
	}
	if (isLoadingTokens) {
		return accountValueLoadingState
	}
	if (isLoadingTickers) {
		return accountValueLoadingState
	}

	const tokenMap = (tokens || [])
		.filter(({ data }) => !!data)
		.reduce((map, { data: token }) => {
			map[token.rri] = token
			return map
		}, {})

	const tickerMap: { [key: string]: Ticker } = (tickers || [])
		.filter(({ data }) => !!data)
		.reduce((map, { data: ticker }) => {
			map[ticker.asset] = ticker
			return map
		}, {})

	const [value, change] = balances.reduce(
		([totalValue, totalChange], { rri, amount }) => {
			const token = tokenMap[rri]
			if (!token) {
				return [totalValue, totalChange]
			}
			const ticker = tickerMap[token.symbol]
			if (!ticker) {
				return [totalValue, totalChange]
			}

			const tokenValue = calculateAmountValue(ticker, amount)
			const tokenChange = tokenValue.multipliedBy(ticker.change || 0).div(100)

			return [totalValue.plus(tokenValue), totalChange.plus(tokenChange)]
		},
		[new BigNumber(0), new BigNumber(0)],
	)

	const ticker = tickerMap?.xrd
	if (!ticker) {
		return { isLoading: isLoadingTokens || isLoadingTickers, value, change }
	}

	const stakedValue = calculateAmountValue(ticker, staked)
	const totalValue = value.plus(stakedValue)

	return {
		isLoading: isLoadingTokens || isLoadingTickers,
		value: totalValue,
		change: change.plus(totalValue.multipliedBy(ticker.change).div(100)),
	}
}

export const useAccountValue = () => {
	const { data: rawBalances, isLoading } = useTokenBalances()
	const balances = rawBalances ? rawBalances.account_balances.liquid_balances : []
	const staked = rawBalances
		? new BigNumber(rawBalances.account_balances.staked_and_unstaking_balance.value).shiftedBy(-18)
		: new BigNumber(0)

	return useGenericaccountsValue(balances, staked, isLoading)
}

export const useAllAccountsValue = () => {
	const { isLoading, balances, staked } = useAllAccountsTokenBalances()

	return useGenericaccountsValue(Object.values(balances), staked, isLoading)
}
