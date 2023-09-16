import { type IIntlStateSetter, type IntlState, LOCALE } from './types'

export const DEFAULT_LOCALE = LOCALE[navigator?.language] || LOCALE.en

export const factory = (set: IIntlStateSetter): IntlState => ({
	locale: DEFAULT_LOCALE,

	selectLocaleAction: (locale: LOCALE) => {
		set(draft => {
			draft.locale = locale
		})
	},
})
