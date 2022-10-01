import browser from 'webextension-polyfill'
import watch from '@src/lib/background/watcher'
import { handleInstall } from '@src/lib/background/install'
import { handleConnect } from '@src/lib/background/messages'
import { handleNotificationClick } from '@src/lib/background/notifications'

watch()

browser.runtime.onInstalled.addListener(handleInstall)
browser.runtime.onConnect.addListener(handleConnect)
browser.notifications.onClicked.addListener(handleNotificationClick)
