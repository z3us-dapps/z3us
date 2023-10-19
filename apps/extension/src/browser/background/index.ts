import { logger as utilsLogger } from '@radixdlt/connector-extension/src/utils/logger'
import browser from 'webextension-polyfill'

import { addDashboard } from '@src/browser/app/context-menu'
import { addLogs } from '@src/browser/background/context-menu'
import { handleInstall } from '@src/browser/background/install'
import { MessageClient } from '@src/browser/background/message-client'
import { handleNotificationClick } from '@src/browser/background/notifications'
import { handleOmniboxChange } from '@src/browser/background/omnibox'
import { handleStorageChange } from '@src/browser/background/storage'
import { getTabRemovedHandler, getTabUpdatedHandler, handleTabActivated } from '@src/browser/background/tabs'
import watch from '@src/browser/background/watcher'
import { addInjectContentScript } from '@src/browser/content-script/context-menu'
import { addDevTools } from '@src/browser/dev-tools/context-menu'
import { addLedger } from '@src/browser/ledger/context-menu'
import { createOffscreen } from '@src/browser/offscreen/offscreen'

const logger = utilsLogger.getSubLogger({ name: 'background' })

const messageHandler = MessageClient(logger)

const handleTabRemoved = getTabRemovedHandler(messageHandler)
const handleTabUpdated = getTabUpdatedHandler(messageHandler)

browser.runtime.onInstalled.addListener(handleInstall)
browser.runtime.onStartup.addListener(() => logger.debug('onStartup'))
browser.runtime.onConnect.addListener(messageHandler.onPort)
browser.runtime.onMessage.addListener(messageHandler.onMessage)
browser.storage.onChanged.addListener(handleStorageChange)
browser.tabs.onActivated.addListener(handleTabActivated)
browser.tabs.onUpdated.addListener(handleTabUpdated)
browser.tabs.onRemoved.addListener(handleTabRemoved)
browser.notifications.onClicked.addListener(handleNotificationClick)
browser.notifications.onButtonClicked.addListener(handleNotificationClick)
browser.omnibox.onInputChanged.addListener(handleOmniboxChange)

browser.contextMenus.removeAll().then(() => {
	addDevTools()
	addLogs()
	addLedger()
	addDashboard()
	addInjectContentScript()
})

createOffscreen()
watch()
