import type { IIntlStateSetter, IntlState, LOCALE } from './types'

export const DEFAULT_LOCALE = navigator?.language || 'en'

export const factory = (set: IIntlStateSetter): IntlState => ({
	locale: (navigator?.language as LOCALE) || 'en',

	selectLocaleAction: (locale: LOCALE) => {
		set(draft => {
			draft.locale = locale
		})
	},
})
