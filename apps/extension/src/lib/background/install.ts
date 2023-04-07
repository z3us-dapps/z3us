import browser from 'webextension-polyfill'

import { sharedStore } from '@src/store'

export const handleInstall = async details => {
	if (details.reason === 'update' && details.previousVersion === '1.0.7') {
		browser.storage.local.clear() // clear state that is no longer compatible
	}

	browser.runtime.setUninstallURL('https://github.com/z3us-dapps/z3us/discussions/150')

	await sharedStore.persist.rehydrate()
	const { setThemeAction, theme } = sharedStore.getState()
	setThemeAction(theme)
}
