import { Theme } from 'packages/ui/src/types'
import browser from 'webextension-polyfill'

const STORAGE_KEY = 'z3us:theme'

export const saveTheme = (theme: Theme) => browser.storage.local.set({ [STORAGE_KEY]: JSON.stringify(theme) })

export const getTheme = (): Promise<Theme> =>
	browser.storage.local.get(STORAGE_KEY).then(values => {
		const defaultThemeValue = values[STORAGE_KEY]
		return (defaultThemeValue ? JSON.parse(defaultThemeValue) : Theme.SYSTEM) as Theme
	})
