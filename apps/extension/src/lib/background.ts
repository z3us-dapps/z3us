import browser, { Tabs } from 'webextension-polyfill'
import watch from '@src/lib/background/watcher'
import { handleInstall } from '@src/lib/background/install'
import { handleContentScriptInject } from '@src/lib/background/inject'
import { handleConnect } from '@src/lib/background/messages'
import { handleNotificationClick } from '@src/lib/background/notifications'

watch()

browser.runtime.onInstalled.addListener(handleInstall)
browser.runtime.onConnect.addListener(handleConnect)
browser.notifications.onClicked.addListener(handleNotificationClick)
browser.tabs.onUpdated.addListener((tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType) =>
	handleContentScriptInject(tabId, changeInfo.url),
)
browser.tabs.onActivated.addListener(async (activeInfo: Tabs.OnActivatedActiveInfoType) => {
	const tab = await browser.tabs.get(activeInfo.tabId)
	if (tab) handleContentScriptInject(tab.id, tab.url)
})
