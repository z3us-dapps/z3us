import { XRD_RRI } from '@src/config'
import { useNoneSharedStore } from '@src/hooks/use-store'
import { useXRDPriceOnDay } from '@src/hooks/react-query/queries/market'
import BigNumber from 'bignumber.js'
import { useTokenInfo } from './react-query/queries/radix'

const relativePercentageDifference = (a: BigNumber, b: BigNumber) =>
	a.minus(b).dividedBy(a.plus(b).dividedBy(2)).multipliedBy(100).absoluteValue()

const percentageChange = (a: BigNumber, b: BigNumber) => b.dividedBy(a).multipliedBy(100).minus(100)

export const useTransactionChange = (rri: string, amount: BigNumber, at: Date) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { data: token } = useTokenInfo(rri)
	const { data: xrdPriceToday } = useXRDPriceOnDay(currency, new Date())
	const { data: xrdPriceAtTheTime } = useXRDPriceOnDay(currency, at)

	if (token?.rri !== XRD_RRI) {
		return {}
	}
	if (xrdPriceAtTheTime === null || xrdPriceToday === null) {
		return {}
	}
	if (xrdPriceAtTheTime === 0) {
		return {}
	}

	const valueToday = amount.multipliedBy(xrdPriceToday)
	const valueAtThetime = amount.multipliedBy(xrdPriceAtTheTime)

	return {
		relativePercentageDifference: relativePercentageDifference(valueAtThetime, valueToday),
		percentageChange: percentageChange(valueAtThetime, valueToday),
		gain: valueToday.minus(valueAtThetime),
	}
}
