import browser from 'webextension-polyfill'

export type ThemeStore = {
	theme: string
	setThemeAction: (theme: string) => void
}

export const whiteList = ['theme']

const popupHtmlMap = {
	light: 'popup-theme-light.html',
	dark: 'popup-theme-dark.html',
	system: 'popup-theme-system.html',
}

export const createThemeStore = set => ({
	theme: 'light',

	setThemeAction: async (theme: string) => {
		const popup = popupHtmlMap[theme]
		await browser.action.setPopup({ popup })

		set(state => {
			state.theme = theme
		})
	},
})
