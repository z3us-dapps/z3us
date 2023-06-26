import type BigNumber from 'bignumber.js'

interface IAllAccountListRowProps {
	change: BigNumber
}

export const Change: React.FC<IAllAccountListRowProps> = ({ change }) => {
	const percentageChange = !change.isEqualTo(0)
		? `${change.isGreaterThan(0) ? '+' : ''}${change.toFixed(2).toLocaleString()}%`
		: '0.00%'

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{percentageChange}</>
}
