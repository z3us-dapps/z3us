import browser from 'webextension-polyfill'

import { injectInpageScript } from '@src/browser/content-script/inpage'
import { MessageClient } from '@src/browser/content-script/messages-client'
import { onRadixStorageChange } from '@src/browser/content-script/storage'

const { onRuntimeMessage, forwardMessageToBackground } = MessageClient()

window.addEventListener('message', forwardMessageToBackground, false)

browser.runtime.onMessage.addListener(onRuntimeMessage)
browser.storage.onChanged.addListener(onRadixStorageChange)

injectInpageScript()

export default {}
