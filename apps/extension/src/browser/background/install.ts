import browser from 'webextension-polyfill'

// import { handleContentScriptInjectAllTabs } from '@src/browser/content-script/status'
import { sharedStore } from '@src/store'

export const handleInstall = async () => {
	browser.runtime.setUninstallURL('https://github.com/z3us-dapps/z3us/discussions/150')

	await sharedStore.persist.rehydrate()
	const { setThemeAction, theme } = sharedStore.getState()
	setThemeAction(theme)

	// await handleContentScriptInjectAllTabs()
}
