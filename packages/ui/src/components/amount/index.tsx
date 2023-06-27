import BigNumber from 'bignumber.js'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'

interface IAllAccountListRowProps {
	value: BigNumber
	currency: string
}

export const Amount: React.FC<IAllAccountListRowProps> = ({ value, currency }) => (
	<>{formatBigNumber(value || new BigNumber(0), currency || '', 2)}</>
)
