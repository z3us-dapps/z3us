import browser from 'webextension-polyfill'
import { openParingPopup } from '@radixdlt/connector-extension/src/chrome/helpers/open-pairing-popup'

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
import { createOffscreen } from '@src/browser/offscreen/offscreen'

const messageHandler = MessageClient()

const handleConnect = getConnectHandler(messageHandler)
const handleRadixMessage = getRadixMessageHandler(messageHandler)
const handleTabRemoved = getTabRemovedHandler(messageHandler)
const handleTabUpdated = getTabUpdatedHandler(messageHandler)

browser.runtime.onInstalled.addListener(handleInstall)
browser.runtime.onConnect.addListener(handleConnect)
browser.runtime.onMessage.addListener(handleRadixMessage)
browser.storage.onChanged.addListener(handleStorageChange)
browser.tabs.onActivated.addListener(handleTabActivated)
browser.tabs.onUpdated.addListener(handleTabUpdated)
browser.tabs.onRemoved.addListener(handleTabRemoved)
browser.notifications.onClicked.addListener(handleNotificationClick)
browser.notifications.onButtonClicked.addListener(handleNotificationClick)
browser.action.onClicked.addListener(openParingPopup)
browser.omnibox.onInputChanged.addListener(handleOmniboxChange)

browser.contextMenus.removeAll().then(() => {
	addDevTools()
	addLedger()
	addDashboard()
	addInjectContentScript()
})

createOffscreen()
watch()
