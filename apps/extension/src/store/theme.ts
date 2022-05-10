import { popupHtmlMap } from '@src/config'
import browser from 'webextension-polyfill'

export type ThemeStore = {
	theme: string
	setThemeAction: (theme: string) => void
}

export const whiteList = ['theme']

export const createThemeStore = set => ({
	theme: 'light',

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
