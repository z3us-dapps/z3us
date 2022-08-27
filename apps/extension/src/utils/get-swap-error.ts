import { swapInputTooLow } from '@src/errors'
import { SwapError } from '@src/types'

export const getSwapError = (errorMessage: string): SwapError => {
	// @TODO: we need a better way to differentiate these errors
	// api messages might be different between exchanges ??
	if (errorMessage === swapInputTooLow.message) {
		return SwapError.ERROR_INSUFFICIENT_BALANCE
	}
	if (errorMessage.includes('but only have')) {
		return SwapError.ERROR_INSUFFICIENT_BALANCE
	}
	return null
}
