/**
 * Converts a string to a number.
 *
 * @param {string} input - The input string to be converted.
 * @throws {Error} Throws an error if the input is not a valid number.
 * @returns {number} The numeric value of the input string.
 */
export const fromString = (input: string): number => {
	// Using unary plus operator to convert the input to a number
	const numericValue = +input

	// Checking if the conversion results in NaN
	if (Number.isNaN(numericValue)) {
		throw new Error(`"${input}" is not a valid number.`)
	}

	return numericValue
}

/**
 * Generates a random number between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @returns {number} A random number between the specified minimum and maximum values.
 * @throws {Error} If the minimum value is greater than or equal to the maximum value.
 *
 * @example
 * const minNumber = 1;
 * const maxNumber = 100;
 * const randomNumber = getRandomNumberInRange(minNumber, maxNumber);
 * console.log(randomNumber); // This will log a random number between 1 and 100 (inclusive).
 */

export const getRandomNumberInRange = (min: number, max: number): number => {
	if (min >= max) {
		throw new Error('Invalid range. The minimum value must be less than the maximum value.')
	}

	const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

	return randomNumber
}
