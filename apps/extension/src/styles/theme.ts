import browser from 'webextension-polyfill'

import { Theme } from 'ui/src/types'

const STORAGE_KEY = 'z3us:theme'

export const saveTheme = (theme: Theme) => browser.storage.local.set({ [STORAGE_KEY]: JSON.stringify(theme) })

export const getTheme = (): Promise<Theme> =>
	browser.storage.local.get(STORAGE_KEY).then(values => {
		const defaultThemeValue = values[STORAGE_KEY]
		return (defaultThemeValue ? JSON.parse(defaultThemeValue as string) : Theme.SYSTEM) as Theme
	})
