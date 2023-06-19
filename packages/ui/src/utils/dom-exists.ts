export const domExists = (): boolean =>
	typeof window !== 'undefined' &&
	window.document !== null &&
	typeof window.document !== 'undefined' &&
	typeof window.requestAnimationFrame !== 'undefined' &&
	typeof window.setTimeout !== 'undefined'
