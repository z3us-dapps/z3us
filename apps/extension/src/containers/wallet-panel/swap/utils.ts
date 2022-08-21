export const getSlippagePercentage = (num: number): string =>
	`${num.toString().length > 4 ? (num * 100).toFixed(1) : num * 100}%`
