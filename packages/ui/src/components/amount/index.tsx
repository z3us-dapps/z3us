import BigNumber from 'bignumber.js'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'

interface IAllAccountListRowProps {
	value: BigNumber
	currency?: string
}
const zero = new BigNumber(0)

export const Amount: React.FC<IAllAccountListRowProps> = ({ value, currency = '' }) => (
	<>{formatBigNumber(value || zero, currency, 2)}</>
)
