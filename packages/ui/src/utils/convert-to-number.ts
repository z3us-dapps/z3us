/**
 * Converts a string to a number.
 *
 * @param {string} input - The input string to be converted.
 * @throws {Error} Throws an error if the input is not a valid number.
 * @returns {number} The numeric value of the input string.
 */
export const convertToNumber = (input: string): number => {
	// Using unary plus operator to convert the input to a number
	const numericValue = +input

	// Checking if the conversion results in NaN
	if (Number.isNaN(numericValue)) {
		throw new Error(`"${input}" is not a valid number.`)
	}

	return numericValue
}
