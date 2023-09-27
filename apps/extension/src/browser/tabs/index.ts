import browser, { Tabs } from 'webextension-polyfill'

export const getExtensionTabsByUrl = async (url: string): Promise<Tabs.Tab[]> => {
	const tabs = await browser.tabs.query({})
	return tabs.filter(tab => tab.url?.includes(`${browser.runtime.id}/${url}`))
}
