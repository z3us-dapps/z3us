import { CHECK_CONTENT_SCRIPT } from '@src/config'
import browser from 'webextension-polyfill'

export const setIcon = async (path: string) => {
	await chrome?.action.setIcon({ path })
	await browser.browserAction?.setIcon({ path })
}
export const showConnected = async () => setIcon('favicon-128x128.png')

export const showDisconnected = async () => setIcon('favicon-off-128x128.png')

const checkContentScript = async (tabId: number): Promise<boolean> => {
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
		await showConnected()
	} else {
		await showDisconnected()
	}
}
