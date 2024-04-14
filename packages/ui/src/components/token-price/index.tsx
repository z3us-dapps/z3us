import { useIntl } from 'react-intl'

import { LoadingBarsIcon } from 'ui/src/components/icons'
import { CURRENCY_STYLES } from 'ui/src/constants/number'
import { useXRDCurrentPrice } from 'ui/src/hooks/queries/coingecko'
import { useToken } from 'ui/src/hooks/queries/tokens'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

interface IProps {
	address: string
	amount?: number
	currency?: string
}

export const TokenPrice: React.FC<IProps> = ({ amount, address, currency }) => {
	const intl = useIntl()
	const { defaultCurrency } = useNoneSharedStore(state => ({
		defaultCurrency: state.currency,
	}))

	const inCurrency = currency || defaultCurrency

	const { data: xrdPrice, isLoading: isLoadingPrice } = useXRDCurrentPrice(inCurrency)
	const { data: token, isLoading: isLoadingToken } = useToken(address)

	if (isLoadingToken || isLoadingPrice) return <LoadingBarsIcon />

	const value = (amount || 0) * (token?.price.xrd.now || 0) * (xrdPrice || 0)

	return <>{intl.formatNumber(value, { currency: inCurrency, ...CURRENCY_STYLES })}</>
}
