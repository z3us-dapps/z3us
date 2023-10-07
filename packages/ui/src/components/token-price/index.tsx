import { FormattedNumber } from 'react-intl'

import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { useXRDPriceOnDay } from 'ui/src/hooks/queries/market'
import { useToken } from 'ui/src/hooks/queries/oci'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

interface IProps {
	symbol: string
	amount?: number
	currency?: string
}

export const TokenPrice: React.FC<IProps> = ({ amount, symbol, currency }) => {
	const { defaultCurrency } = useNoneSharedStore(state => ({
		defaultCurrency: state.currency,
	}))

	const inCurrency = currency || defaultCurrency

	const { data: token, isLoading: isLoadingToken } = useToken(symbol)
	const { data: price, isLoading: isLoadingPrice } = useXRDPriceOnDay(inCurrency, new Date())

	if (isLoadingToken || isLoadingPrice) return <FallbackLoading />

	const value = (amount || 0) * +(token?.price.xrd.now || 0) * (price || 0)

	return <FormattedNumber value={value} style="currency" currency={inCurrency} />
}
