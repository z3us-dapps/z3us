import browser from 'webextension-polyfill'

// @ts-ignore
// eslint-disable-next-line import/default
import inpage from '@src/browser/inpage?script&module'
import { newMessage } from '@src/browser/messages/message'
import { MessageAction, MessageSource } from '@src/browser/messages/types'
import { sharedStore } from '@src/store'

import { STATUS_ICONS } from './constants'

export const setIcon = async (path: string) => {
	await chrome?.action?.setIcon({ path })
	await browser?.action?.setIcon({ path })
	await browser.browserAction?.setIcon({ path })
}

export const showConnected = async () => setIcon(STATUS_ICONS.ON)

export const showDisconnected = async () => setIcon(STATUS_ICONS.OFF)

export const checkContentScript = async (tabId: number): Promise<boolean> => {
	if (!tabId) {
		return false
	}
	try {
		const injected = await browser.tabs.sendMessage(
			tabId,
			newMessage(MessageAction.PING, MessageSource.BACKGROUND, MessageSource.INPAGE, null),
		)
		return injected === true
	} catch {
		return false
	}
}

export const handleContentScriptInjectAllTabs = async () => {
	const tabs = await browser.tabs.query({})
	await Promise.all(
		tabs.map(async tab => {
			try {
				if (tab.id) {
					if ((await checkContentScript(tab.id)) === true) return
					await browser.scripting.executeScript({
						target: { tabId: tab.id, allFrames: true },
						files: [inpage],
					})
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.warn(tab.id, error)
			}
		}),
	)
}

export const handleContentScriptInject = async (tabId: number) => {
	if ((await checkContentScript(tabId)) === true) return

	try {
		await browser.scripting.executeScript({
			target: { tabId, allFrames: true },
			files: [inpage],
		})
		await showConnected()
	} catch (error) {
		// eslint-disable-next-line no-console
		console.warn(tabId, error)
	}
}

export const handleCheckContentScript = async (tabId: number) => {
	const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
	if (tab?.id !== tabId) return

	const tabURL = tab?.url ? new URL(tab.url) : null
	const tabHost = tabURL?.host || ''

	if ((await checkContentScript(tab.id)) === true) {
		await sharedStore.persist.rehydrate()
		// const { approvedWebsites } = sharedStore.getState()
		const approvedWebsites = [] // @TODO

		if (tabHost in approvedWebsites) {
			await showConnected()
			return
		}
	}

	await showDisconnected()
}
