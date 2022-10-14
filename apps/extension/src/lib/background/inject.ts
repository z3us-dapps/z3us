import { constcontentScriptId, trustedDappMatches } from '@src/config'
import { getNoneSharedStore } from '@src/services/state'
import { sharedStore } from '@src/store'
import browser from 'webextension-polyfill'
import { injectContentScriptNotificationIdPrefix, notificationDelimiter } from './notifications'

export const handleContentScriptInject = async (tabId: number, tabUrl?: string) => {
	if (!tabUrl) return

	const url = new URL(tabUrl)
	const origin = `${url.origin}/*`
	if (trustedDappMatches.includes(origin)) {
		return
	}

	const currentScripts = await browser.scripting.getRegisteredContentScripts({ ids: [constcontentScriptId] })
	if (currentScripts.length > 0 && currentScripts[0].matches.includes(origin)) {
		return
	}

	await sharedStore.persist.rehydrate()
	const { selectKeystoreId } = sharedStore.getState()

	const noneSharedStore = await getNoneSharedStore(selectKeystoreId)
	await noneSharedStore.persist.rehydrate()
	const { declineWebsiteAction } = noneSharedStore.getState()

	if (url.host in declineWebsiteAction) {
		return
	}

	const notificationId = `${injectContentScriptNotificationIdPrefix}${selectKeystoreId}${notificationDelimiter}${tabId}${notificationDelimiter}${tabUrl}`

	await browser.notifications.clear(notificationId)
	if (browser.runtime.lastError) {
		throw new Error(browser.runtime.lastError.message)
	}

	await browser.notifications.create(notificationId, {
		type: 'basic',
		iconUrl: browser.runtime.getURL('favicon-128x128.png'),
		title: `Connect`,
		eventTime: new Date().getTime(),
		message: `Connect to ${url.host} interact with RadixDLT network via Z3US wallet.`,
		isClickable: true,
	})
	if (browser.runtime.lastError) {
		throw new Error(browser.runtime.lastError.message)
	}
}
