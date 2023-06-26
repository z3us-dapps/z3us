/**
 * Checks if the DOM environment exists.
 * @returns {boolean} Returns true if the DOM environment exists, otherwise false.
 */
export const domExists = (): boolean =>
	typeof window !== 'undefined' &&
	window.document !== null &&
	typeof window.document !== 'undefined' &&
	typeof window.requestAnimationFrame !== 'undefined' &&
	typeof window.setTimeout !== 'undefined'
