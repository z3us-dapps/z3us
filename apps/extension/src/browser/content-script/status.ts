/* eslint-disable no-console */
import browser from 'webextension-polyfill'

// @ts-ignore
import contentScript from '@src/browser/content-script?script'
import { newMessage } from '@src/browser/messages/message'
import { MessageSource } from '@src/browser/messages/types'

import { STATUS_ICONS } from './constants'
import { MessageAction } from './types'

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
			newMessage(MessageAction.CONTENT_SCRIPT_PING, MessageSource.BACKGROUND, MessageSource.INPAGE, null),
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
						target: { tabId: tab.id },
						files: [contentScript],
					})
				}
			} catch (error) {
				console.error(`handleContentScriptInjectAllTabs: ${error}`)
			}
		}),
	)
}

export const handleContentScriptInject = async (tabId: number) => {
	if ((await checkContentScript(tabId)) === true) return

	try {
		await browser.scripting.executeScript({
			target: { tabId },
			files: [contentScript],
		})
		await showConnected()
	} catch (error) {
		console.error(`handleContentScriptInject: ${error}`)
	}
}

export const handleCheckContentScript = async (tabId: number) => {
	const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
	if (tab?.id !== tabId) return

	if ((await checkContentScript(tab.id)) === true) {
		await showConnected()
	} else {
		await showDisconnected()
	}
}
