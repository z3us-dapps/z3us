import { dAppEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import browser from 'webextension-polyfill'

import { MessageClient } from '@src/browser/content-script/messages-client'
// @ts-ignore
// eslint-disable-next-line import/default
import inpage from '@src/browser/inpage?script&module'

const { handlePing, forwardInpageMessageToBackground, forwardRadixEventToBackground } = MessageClient()

const script = document.createElement('script')
script.type = 'module'
script.src = browser.runtime.getURL(inpage)

const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
head.appendChild(script)

// returns true in any case to prevent reinjecting of the script
browser.runtime.onMessage.addListener(handlePing)
window.addEventListener('message', forwardInpageMessageToBackground, false)
window.addEventListener(dAppEvent.send, forwardRadixEventToBackground)

export {}
