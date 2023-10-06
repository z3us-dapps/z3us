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
