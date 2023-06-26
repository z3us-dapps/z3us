import type BigNumber from 'bignumber.js'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'

interface IAllAccountListRowProps {
	value: BigNumber
}

export const Price: React.FC<IAllAccountListRowProps> = ({ value }) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	return formatBigNumber(value, currency, 2)
}
