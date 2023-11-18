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
