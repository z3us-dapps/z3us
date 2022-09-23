const DEFAULT_DICTIONARY = '9876543210$-.,'
const DEFAULT_CONSTANTS = ['-', '$', '.', '%']

type TTickerArr = Array<string>

export const getTickerChars = (prefix: string): Array<TTickerArr> => {
	const currencyPrefixArr = prefix.split('')
	const charDictionary = [...DEFAULT_DICTIONARY.split(''), ...currencyPrefixArr]
	const tickerConstants = [...DEFAULT_CONSTANTS, ...currencyPrefixArr]

	return [
		Object.keys(Object.fromEntries(charDictionary.map(k => [k, '']))),
		Object.keys(Object.fromEntries(tickerConstants.map(k => [k, '']))),
	]
}
