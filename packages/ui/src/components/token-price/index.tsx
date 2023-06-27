import BigNumber from 'bignumber.js'

import { useXRDPriceOnDay } from '../../hooks/queries/market'
import { useTokens } from '../../hooks/queries/oci'
import { useNoneSharedStore } from '../../hooks/use-store'
import { formatBigNumber } from '../../utils/formatters'

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

	const { data: tokens } = useTokens()
	const { data: price } = useXRDPriceOnDay(inCurrency, new Date())

	const token = tokens[symbol?.toUpperCase()]

	return (
		<>
			{formatBigNumber(
				amount.multipliedBy(new BigNumber(token?.price.xrd || 0)).multipliedBy(price || 0),
				inCurrency,
				2,
			)}
		</>
	)
}
