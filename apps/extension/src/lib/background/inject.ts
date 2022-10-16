import { CHECK_CONTENT_SCRIPT } from '@src/config'
import browser from 'webextension-polyfill'

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
		const path = 'favicon-128x128.png'
		chrome?.action.setIcon({ path })
		browser.browserAction?.setIcon({ path })
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

export const handleCheckContentScript = async (tabId: number) => {
	let path = 'images/oci/pool-icon-oci.png'
	if ((await checkContentScript(tabId)) === true) path = 'favicon-128x128.png'

	chrome?.action.setIcon({ path })
	browser.browserAction?.setIcon({ path })
}
