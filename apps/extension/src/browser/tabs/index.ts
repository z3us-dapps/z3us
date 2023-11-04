import type { Tabs } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

export const getExtensionTabsByUrl = async (url: string): Promise<Tabs.Tab[]> => {
	const tabs = await browser.tabs.query({})
	return tabs.filter(tab => tab.url?.includes(`${browser.runtime.id}/${url}`))
}

export const openTabWithURL = async (url: string) => {
	const currentWindow = await browser.windows.getCurrent()
	if (currentWindow != null) {
		currentWindow.focused = true
		return browser.tabs.create({ url, active: true })
	}
	return browser.windows.create({ url, focused: true })
}
