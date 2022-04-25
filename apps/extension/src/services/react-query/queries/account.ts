import BigNumber from 'bignumber.js'
import { useUSDTickers } from './bitfinex'
import { useAllAccountsTokenBalances, useTokenBalances, useTokenInfos } from './radix'

const accountValueLoadingState = { isLoading: true, value: new BigNumber(0), change: new BigNumber(0) }

const useGenericaccountsValue = (
	balances: Array<{
		rri: string
		amount: string | BigNumber
	}>,
) => {
	const rris = balances.map(({ rri }) => rri)
	const tokens = useTokenInfos(rris)?.filter(({ data }) => !!data) || []
	const tickers = useUSDTickers(tokens.map(({ data }) => data.symbol))

	const isLoadingTokens = tokens.some(result => result.isLoading)
	if (isLoadingTokens) {
		return accountValueLoadingState
	}

	const isLoadingTickers = tickers.some(result => result.isLoading)
	if (isLoadingTickers) {
		return accountValueLoadingState
	}

	const tokenMap = (tokens || [])
		.filter(({ data }) => !!data)
		.reduce((map, { data: token }) => {
			map[token.rri] = token
			return map
		}, {})

	const tickerMap = (tickers || [])
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
			let tokenAmount
			if (amount instanceof BigNumber) {
				tokenAmount = amount
			} else {
				tokenAmount = new BigNumber(amount).shiftedBy(-18)
			}
			const tokenValue = tokenAmount.multipliedBy(ticker.last_price)

			return [totalValue.plus(tokenValue), totalChange.plus(tokenValue.multipliedBy(ticker.change).div(100))]
		},
		[new BigNumber(0), new BigNumber(0)],
	)

	return { isLoading: false, value, change }
}

export const useAccountValue = () => {
	const { data: rawBalances } = useTokenBalances()
	const balances = rawBalances ? rawBalances.account_balances.liquid_balances : []

	return useGenericaccountsValue(balances)
}

export const useAllAccountsValue = () => {
	const balances = useAllAccountsTokenBalances()

	return useGenericaccountsValue(balances)
}
