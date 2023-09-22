import browser, { Storage } from 'webextension-polyfill'

import { injectInpageScript } from '@src/browser/content-script/inpage'
import { MessageClient } from '@src/browser/content-script/messages-client'

const { checkConnectButtonStatus, onRuntimeMessage, forwardMessageToBackground } = MessageClient()

window.addEventListener('message', forwardMessageToBackground, false)

browser.runtime.onMessage.addListener(onRuntimeMessage)
browser.storage.onChanged.addListener((changes: { [key: string]: Storage.StorageChange }) => {
	if (changes.connectionPassword) checkConnectButtonStatus()
})

injectInpageScript()
checkConnectButtonStatus()

export default {}
