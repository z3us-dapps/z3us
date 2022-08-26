import { swapErrors } from '@src/config'

export type TSwapError = typeof swapErrors.ERROR_INSUFFICIENT_BALANCE | typeof swapErrors.ERROR_NETWORK | null

export const getSwapError = (errorMessage: string): TSwapError => {
	// @TODO: we need a better way to differentiate these errors
	// api messages might be different between exchanges ??
	if (errorMessage.includes('but only have')) {
		return swapErrors.ERROR_INSUFFICIENT_BALANCE
	}
	return null
}
