import { type OlympiaState } from './types'

const defaultState = {
	olympiaAddresses: undefined,
}
export const factory = (): OlympiaState => ({
	...defaultState,
})
