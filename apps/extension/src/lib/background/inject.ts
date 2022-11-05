import { CHECK_CONTENT_SCRIPT, z3usDappStatusIcons } from '@src/config'
import browser from 'webextension-polyfill'
import browserService from '@src/services/browser'
import { sharedStore } from '@src/store'
import { getNoneSharedStore } from '@src/services/state'

export const setIcon = async (path: string) => {
	await chrome?.action.setIcon({ path })
	await browser.browserAction?.setIcon({ path })
}
export const showConnected = async () => setIcon(z3usDappStatusIcons.ON)

export const showDisconnected = async () => setIcon(z3usDappStatusIcons.OFF)

export const checkContentScript = async (tabId: number): Promise<boolean> => {
	if (!tabId) {
		return false
	}
	try {
		const injected = await browser.tabs.sendMessage(tabId, { op: CHECK_CONTENT_SCRIPT })
		return injected === true
	} catch {
		return false
	}
}

export const handleContentScriptInject = async (tabId: number) => {
	if ((await checkContentScript(tabId)) === true) return

	try {
		await browser.scripting.executeScript({
			target: { tabId, allFrames: true },
			files: ['src/lib/content-script.js'],
		})
		await showConnected()
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

export const handleCheckContentScript = async (tabId: number) => {
	if ((await checkContentScript(tabId)) === true) {
		await sharedStore.persist.rehydrate()
		const { selectKeystoreId } = sharedStore.getState()

		const useNoneSharedStore = await getNoneSharedStore(selectKeystoreId)
		await useNoneSharedStore.persist.rehydrate()
		const { approvedWebsites } = useNoneSharedStore.getState()

		const tab = await browserService.getCurrentTab()
		if (tab.id === tabId) {
			const tabURL = tab?.url ? new URL(tab.url) : null
			const tabHost = tabURL?.host || ''

			if (tabHost in approvedWebsites) {
				await showConnected()
				return
			}
		}
	}

	await showDisconnected()
}
