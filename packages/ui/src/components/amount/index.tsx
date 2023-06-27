import BigNumber from 'bignumber.js'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'

import { useNoneSharedStore } from '../../hooks/use-store'

interface IAllAccountListRowProps {
	value: BigNumber
	currency?: string
}
const zero = new BigNumber(0)

export const Amount: React.FC<IAllAccountListRowProps> = ({ value, currency }) => {
	const { defaultCurrency } = useNoneSharedStore(state => ({
		defaultCurrency: state.currency,
	}))

	return <>{formatBigNumber(value || zero, currency || defaultCurrency, 2)}</>
}
