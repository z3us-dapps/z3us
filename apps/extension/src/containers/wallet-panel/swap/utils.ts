// Test for positive numbers only allow max 9 decimals
export const REGEX_INPUT = /^\d*(\.\d{0,9})?$/i

export const getSlippagePercentage = (num: number): string => `${(num * 100).toFixed()}%`

const REGEX_COMMA = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g

export const numberWithCommas = (number: string | number) => {
	if (typeof number === 'undefined' || number === null) {
		return ''
	}
	if (typeof number === 'number') {
		return number.toString().replace(REGEX_COMMA, ',')
	}
	if (typeof number === 'string') {
		return number.replace(REGEX_COMMA, ',')
	}
	return number
}

export const strStripCommas = (str: string): string => {
	if (typeof str === 'string') {
		return str.replace(/,/g, '')
	}

	return str
}
