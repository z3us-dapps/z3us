function domExists() {
	return typeof window !== 'undefined' && window.document && window.requestAnimationFrame && window.setTimeout
}

function warnNonProduction(message: string) {
	if (process.env.NODE_ENV !== 'production') {
		/* eslint-disable-next-line no-console */
		console.warn(message)
	}
}

export { domExists, warnNonProduction }
