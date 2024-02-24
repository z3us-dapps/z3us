import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import { logger as utilsLogger } from '@radixdlt/connector-extension/src/utils/logger'
import browser from 'webextension-polyfill'

import { addDashboard } from '@src/browser/app/context-menu'
import { addLogs } from '@src/browser/background/context-menu'
import { handleInstall } from '@src/browser/background/install'
import { MessageClient } from '@src/browser/background/message-client'
import '@src/browser/background/notifications'
import '@src/browser/background/omnibox'
import { handleStorageChange } from '@src/browser/background/storage'
import { getTabRemovedHandler, getTabUpdatedHandler } from '@src/browser/background/tabs'
import watch from '@src/browser/background/watcher'
import { addInjectContentScript } from '@src/browser/content-script/context-menu'
import { addDevTools } from '@src/browser/dev-tools/context-menu'
import { addLedger } from '@src/browser/ledger/context-menu'
import { createOffscreen } from '@src/browser/offscreen/offscreen'

const logger = utilsLogger.getSubLogger({ name: 'background' })

const messageHandler = MessageClient(logger)

const handleTabRemoved = getTabRemovedHandler(messageHandler)
const handleTabUpdated = getTabUpdatedHandler(messageHandler)

globalThis.onerror = err => {
	// eslint-disable-next-line no-console
	console.error('Unhandled error:', err)
}

// keepAlive from offscreen page
globalThis.onmessage = e => {
	// eslint-disable-next-line no-console
	console.debug('Keep alive', e)
}

browser.runtime.onInstalled.addListener(handleInstall)
browser.runtime.onStartup.addListener(() => logger.debug('onStartup'))
browser.runtime.onConnect.addListener(messageHandler.onPort)
browser.runtime.onMessage.addListener(messageHandler.onMessage)
browser.storage.onChanged.addListener(handleStorageChange)
browser.tabs.onUpdated.addListener(handleTabUpdated)
browser.tabs.onRemoved.addListener(handleTabRemoved)

browser.idle.onStateChanged.addListener(state => {
	logger.debug('💻 onStateChanged:', state)
	if (state === 'active') browser.runtime.sendMessage(createRadixMessage.restartConnector())
})

browser.contextMenus.removeAll().then(() => {
	addInjectContentScript()
	addDashboard()
	addLogs()
	addLedger()
	addDevTools()
})

createOffscreen()
watch()
