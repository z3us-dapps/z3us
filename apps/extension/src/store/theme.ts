import browser from 'webextension-polyfill'

import { popupHtmlMap } from '@src/config'

import { ThemeState } from './types'

export const factory = (set): ThemeState => ({
	theme: 'system',

	setThemeAction: async (theme: string) => {
		const popup = popupHtmlMap[theme]

		if (browser.browserAction) {
			await browser.browserAction.setPopup({ popup })
		} else if (browser.action) {
			await browser.action.setPopup({ popup })
		}

		set(state => {
			state.theme = theme
		})
	},
})
