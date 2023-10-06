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
export const getShortAddress = (account = '', shortLength = 4) => {
	if (account === '') return ''
	if (typeof account !== 'string') return ''
	return `${account?.substring(0, shortLength)}...${account?.slice(-shortLength)}`
}
