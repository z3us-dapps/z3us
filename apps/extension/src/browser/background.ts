import { createOffscreen } from '@radixdlt/connector-extension/src/chrome/offscreen/create-offscreen'
import browser from 'webextension-polyfill'

import { handleInstall } from '@src/browser/background/install'
import { MessageClient } from '@src/browser/background/message-client'
import { handleConnect, handleOffscreenMessage } from '@src/browser/background/messages'
import { handleNotificationClick } from '@src/browser/background/notifications'
import { handleStorageChange } from '@src/browser/background/storage'
import watch from '@src/browser/background/watcher'
import fromInpageMessageHandlers from '@src/browser/inpage/message-handlers'
import fromPopupMessageHandlers from '@src/browser/popup/message-handlers'
import '@src/helpers/polyfills'

import { handleCheckContentScript } from './content-script/status'

const messageHandler = MessageClient(fromPopupMessageHandlers, fromInpageMessageHandlers)

createOffscreen()
watch()

browser.runtime.onInstalled.addListener(handleInstall)
browser.runtime.onConnect.addListener(handleConnect(messageHandler))
browser.storage.onChanged.addListener(handleStorageChange)
browser.runtime.onMessage.addListener(handleOffscreenMessage(messageHandler))
browser.notifications.onClicked.addListener(handleNotificationClick)
browser.tabs.onUpdated.addListener((tabId: number) => handleCheckContentScript(tabId))
browser.tabs.onActivated.addListener(({ tabId }) => handleCheckContentScript(tabId))
