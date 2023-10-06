import browser from 'webextension-polyfill'

import { injectInpageScript } from '@src/browser/content-script/inpage'
import { MessageClient } from '@src/browser/content-script/messages-client'
import { checkConnectButtonStatus, onStorageChange } from '@src/browser/content-script/storage'

const { onRuntimeMessage, onWindowMessage } = MessageClient()

window.addEventListener('message', onWindowMessage, false)

browser.runtime.onMessage.addListener(onRuntimeMessage)
browser.storage.onChanged.addListener(onStorageChange)

injectInpageScript()
checkConnectButtonStatus()

export default {}
