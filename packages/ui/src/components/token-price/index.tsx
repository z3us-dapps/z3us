import BigNumber from 'bignumber.js'

import { useXRDPriceOnDay } from '../../hooks/queries/market'
import { useTokens } from '../../hooks/queries/oci'
import { Amount } from '../amount'

interface IProps {
	symbol: string
	amount: BigNumber
	currency?: string
}

export const TokenPrice: React.FC<IProps> = ({ amount, symbol, currency }) => {
	const { data: tokens } = useTokens()
	const { data: price } = useXRDPriceOnDay(currency, new Date())

	const token = tokens[symbol?.toUpperCase()]

	return (
		<Amount value={amount.multipliedBy(new BigNumber(token?.price.xrd || 0)).multipliedBy(price)} currency={currency} />
	)
}
