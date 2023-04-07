import browser from 'webextension-polyfill'

import { handleInstall } from '@src/lib/background/install'
import { handleConnect } from '@src/lib/background/messages'
import { handleNotificationClick } from '@src/lib/background/notifications'
import watch from '@src/lib/background/watcher'
import { handleCheckContentScript } from '@src/services/content-script'

watch()

browser.runtime.onInstalled.addListener(handleInstall)
browser.runtime.onConnect.addListener(handleConnect)

browser.notifications.onClicked.addListener(handleNotificationClick)

browser.tabs.onUpdated.addListener((tabId: number) => handleCheckContentScript(tabId))
browser.tabs.onActivated.addListener(({ tabId }) => handleCheckContentScript(tabId))
