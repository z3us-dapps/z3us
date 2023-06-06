import browser from 'webextension-polyfill'

import { getTabRemovedHandler, getTabUpdatedHandler, handleTabActivated } from '@src/browser/background//tabs'
import { handleInstall } from '@src/browser/background/install'
import { MessageClient } from '@src/browser/background/message-client'
import { getConnectHandler, getRadixMessageHandler } from '@src/browser/background/messages'
import { handleNotificationClick } from '@src/browser/background/notifications'
import { handleOmniboxChange } from '@src/browser/background/omnibox'
import { handleStorageChange } from '@src/browser/background/storage'
import watch from '@src/browser/background/watcher'
import { addInjectContentScript } from '@src/browser/content-script/context-menu'
import { addDevTools } from '@src/browser/dev-tools/context-menu'
import { addLedger } from '@src/browser/ledger/context-menu'
import messageHandlers from '@src/browser/messages/message-handlers'
import { createOffscreen } from '@src/browser/offscreen/offscreen'
import { addPairing } from '@src/browser/pairing/context-menu'

const messageHandler = MessageClient(messageHandlers)

const handleConnect = getConnectHandler(messageHandler)
const handleRadixMessage = getRadixMessageHandler(messageHandler)
const handleTabRemoved = getTabRemovedHandler(messageHandler)
const handleTabUpdated = getTabUpdatedHandler(messageHandler)

browser.runtime.onInstalled.addListener(handleInstall)
browser.runtime.onConnect.addListener(handleConnect)
browser.storage.onChanged.addListener(handleStorageChange)
browser.runtime.onMessage.addListener(handleRadixMessage)
browser.notifications.onClicked.addListener(handleNotificationClick)
browser.tabs.onActivated.addListener(handleTabActivated)
browser.tabs.onUpdated.addListener(handleTabUpdated)
browser.tabs.onRemoved.addListener(handleTabRemoved)
browser.omnibox.onInputChanged.addListener(handleOmniboxChange)

browser.contextMenus.removeAll().then(() => {
	addDevTools()
	addPairing()
	addLedger()
	addInjectContentScript()
})

createOffscreen()
watch()
