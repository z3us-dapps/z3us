import BigNumber from 'bignumber.js'
import { FormattedNumber } from 'react-intl'

import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { useXRDPriceOnDay } from 'ui/src/hooks/queries/market'
import { useTokens } from 'ui/src/hooks/queries/oci'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

interface IProps {
	symbol: string
	amount: BigNumber
	currency?: string
}

export const TokenPrice: React.FC<IProps> = ({ amount, symbol, currency }) => {
	const { defaultCurrency } = useNoneSharedStore(state => ({
		defaultCurrency: state.currency,
	}))

	const inCurrency = currency || defaultCurrency

	const { data: tokens, isLoading: isLoadingTokens } = useTokens()
	const { data: price, isLoading: isLoadingPrice } = useXRDPriceOnDay(inCurrency, new Date())

	if (isLoadingTokens || isLoadingPrice) return <FallbackLoading />

	const token = tokens[symbol?.toUpperCase()]

	return (
		<FormattedNumber
			value={amount
				.multipliedBy(new BigNumber(token?.price.xrd || 0))
				.multipliedBy(price || 0)
				.toNumber()}
			style="currency"
			currency={inCurrency}
		/>
	)
}
