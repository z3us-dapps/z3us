// this must be first import
import '@src/helpers/polyfills'

import { createOffscreen } from '@radixdlt/connector-extension/src/chrome/offscreen/create-offscreen'
import browser from 'webextension-polyfill'

import { handleInstall } from '@src/browser/background/install'
import { MessageClient } from '@src/browser/background/message-client'
import { handleConnect, handleOffscreenMessage } from '@src/browser/background/messages'
import { handleNotificationClick } from '@src/browser/background/notifications'
import { handleOmniboxChange } from '@src/browser/background/omnibox'
import { handleStorageChange } from '@src/browser/background/storage'
import watch from '@src/browser/background/watcher'
import { handleCheckContentScript } from '@src/browser/content-script/status'
import { addDevTools } from '@src/browser/dev-tools/context-menu'
import fromInpageMessageHandlers from '@src/browser/inpage/message-handlers'
import { addPairing } from '@src/browser/pairing/context-menu'
import fromPopupMessageHandlers from '@src/browser/popup/message-handlers'

const messageHandler = MessageClient(fromPopupMessageHandlers, fromInpageMessageHandlers)

browser.runtime.onInstalled.addListener(handleInstall)
browser.runtime.onConnect.addListener(handleConnect(messageHandler))
browser.storage.onChanged.addListener(handleStorageChange)
browser.runtime.onMessage.addListener(handleOffscreenMessage(messageHandler))
browser.notifications.onClicked.addListener(handleNotificationClick)
browser.tabs.onUpdated.addListener((tabId: number) => handleCheckContentScript(tabId))
browser.tabs.onActivated.addListener(({ tabId }) => handleCheckContentScript(tabId))
browser.omnibox.onInputChanged.addListener(handleOmniboxChange)

browser.contextMenus.removeAll().then(() => {
	addDevTools()
	addPairing()
})

createOffscreen()
watch()
