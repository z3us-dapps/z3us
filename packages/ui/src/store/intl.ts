import { languages } from 'ui/src/constants/intl'

import type { IIntlStateSetter, IntlState, LOCALE } from './types'

export const DEFAULT_LOCALE = Object.keys(languages).includes(navigator?.language)
	? (navigator?.language as LOCALE)
	: 'en'

export const factory = (set: IIntlStateSetter): IntlState => ({
	locale: DEFAULT_LOCALE,

	selectLocaleAction: (locale: LOCALE) => {
		set(draft => {
			draft.locale = locale
		})
	},
})
