function domExists() {
	return typeof window !== 'undefined' && window.document && window.requestAnimationFrame && window.setTimeout
}

function warnNonProduction(message: string) {
	if (process.env.NODE_ENV !== 'production') {
		/* eslint-disable-next-line no-console */
		console.warn(message)
	}
}

function getMoneyString(numericValue: number): string {
	return numericValue.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}

export { domExists, warnNonProduction, getMoneyString }
