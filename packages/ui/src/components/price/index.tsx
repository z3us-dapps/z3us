import type BigNumber from 'bignumber.js'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'

import { Amount } from '../amount'

interface IAllAccountListRowProps {
	value: BigNumber
	currency?: string
}

export const Price: React.FC<IAllAccountListRowProps> = ({ value, currency }) => {
	const { defaultCurrency } = useNoneSharedStore(state => ({
		defaultCurrency: state.currency,
	}))

	return <Amount value={value} currency={currency || defaultCurrency} />
}
