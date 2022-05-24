import { popupHtmlMap } from '@src/config'
import browser from 'webextension-polyfill'
import { SetState } from 'zustand'
import { SharedStore, ThemeStore } from './types'

export const whiteList = ['theme']

export const factory = (set: SetState<SharedStore>): ThemeStore => ({
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
