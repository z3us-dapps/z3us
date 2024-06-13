/**
 * Returns a short version of the account address.
 *
 * @param {string} account - The account address.
 * @param {number} [shortLength=4] - The desired length of the short version.
 * @returns {string} - The short version of the account address.
 *
 * @example
 * const accountAddress = 'rdx1234567890abcdef1234567890abcdef12345678';
 * const shortAddress = getShortAddress(accountAddress);
 * console.log(shortAddress);
 * // Output: 'rdx1...5678'
 *
 */
export const getShortAddress = (value = '', shortLength = 4) => {
	if (value === '') return ''
	if (typeof value !== 'string') return ''
	if (value.length <= 4) return value
	return `${value?.substring(0, shortLength)}...${value?.slice(-shortLength)}`
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string.
 * @returns {string} The input string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string): string => {
	if (str == null) {
		throw new Error('Input string is null or undefined.')
	}
	if (str.length === 0) {
		return str
	}
	if (typeof str !== 'string') {
		throw new Error('Input is not a string.')
	}
	const firstCodePoint = str.codePointAt(0)
	if (
		(firstCodePoint !== undefined && firstCodePoint > 0x7f) ||
		(firstCodePoint !== undefined && Number.isNaN(firstCodePoint))
	) {
		throw new Error('Input string contains invalid Unicode character.')
	}
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Returns the prefix of a string.
 *
 * @param {string} str - The input string.
 * @param {number} [len=2] - The desired length of the prefix.
 * @returns {string} - The prefix of the input string.
 *
 * @example
 * const inputString = 'Hello, World!';
 * const prefix = getStrPrefix(inputString);
 * console.log(prefix);
 * // Output: 'He'
 *
 * @example
 * const inputString = 'Hello, World!';
 * const prefix = getStrPrefix(inputString, 5);
 * console.log(prefix);
 * // Output: 'Hello'
 */
export const getStrPrefix = (str = '', len = 2) => {
	if (str === '') return ''
	if (typeof str !== 'string') return ''
	return `${str?.substring(0, len)}`
}
