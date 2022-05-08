export const domExists = () =>
	typeof window !== 'undefined' && window.document && window.requestAnimationFrame && window.setTimeout
