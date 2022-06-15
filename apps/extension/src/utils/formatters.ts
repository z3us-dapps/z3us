import BigNumber from 'bignumber.js'

BigNumber.set({
	ROUNDING_MODE: BigNumber.ROUND_HALF_UP,
	EXPONENTIAL_AT: [-30, 30],
})

const format = {
	prefix: '',
	suffix: '',
	decimalSeparator: '.',
	groupSeparator: ',',
	groupSize: 3,
	secondaryGroupSize: 0,
	fractionGroupSeparator: ' ',
	fractionGroupSize: 0,
}

const currencySettingsMap = {
	USD: { prefix: '$', suffix: '' },
	GBP: { prefix: '£', suffix: '' },
	EUR: { prefix: '', suffix: '€' },
}

export const formatBigNumber = (x: BigNumber, currency = '', decimalPlaces: number = 8) =>
	currency
		? x.toFormat(decimalPlaces, {
				...format,
				...(currencySettingsMap[currency.toUpperCase()] || {}),
		  })
		: x.decimalPlaces(decimalPlaces).toString()
