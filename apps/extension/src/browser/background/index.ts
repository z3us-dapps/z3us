import { openParingPopup } from '@radixdlt/connector-extension/src/chrome/helpers/open-pairing-popup'
import browser from 'webextension-polyfill'

import { addDashboard } from '@src/browser/app/context-menu'
import { handleInstall } from '@src/browser/background/install'
import { MessageClient } from '@src/browser/background/message-client'
import { getConnectHandler, getRadixMessageHandler } from '@src/browser/background/messages'
import { handleNotificationClick } from '@src/browser/background/notifications'
import { handleOmniboxChange } from '@src/browser/background/omnibox'
import { handleStorageChange } from '@src/browser/background/storage'
import { getTabRemovedHandler, getTabUpdatedHandler, handleTabActivated } from '@src/browser/background/tabs'
import watch from '@src/browser/background/watcher'
import { addInjectContentScript } from '@src/browser/content-script/context-menu'
import { addDevTools } from '@src/browser/dev-tools/context-menu'
import { addLedger } from '@src/browser/ledger/context-menu'
import { addOffscreen } from '@src/browser/offscreen/context-menu'
import { createOffscreen } from '@src/browser/offscreen/offscreen'
import { addPairing } from '@src/browser/pairing/context-menu'

const messageHandler = MessageClient()

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
browser.action.onClicked.addListener(openParingPopup)

browser.contextMenus.removeAll().then(() => {
	addDevTools()
	addPairing()
	addLedger()
	addOffscreen()
	addDashboard()
	addInjectContentScript()
})

createOffscreen()
watch()
