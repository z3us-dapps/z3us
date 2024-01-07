/* eslint-disable no-console */
import browser from 'webextension-polyfill'

// @ts-ignore
import contentScript from '@src/browser/content-script?script'
import { newMessage } from '@src/browser/messages/message'
import { MessageSource } from '@src/browser/messages/types'

import { MessageAction } from './types'

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
						target: { tabId: tab.id, allFrames: true },
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
			target: { tabId, allFrames: true },
			files: [contentScript],
		})
	} catch (error) {
		console.error(`handleContentScriptInject: ${error}`)
	}
}
