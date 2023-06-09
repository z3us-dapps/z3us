import browser from 'webextension-polyfill'

import { MessageClient } from '@src/browser/content-script/messages-client'
// @ts-ignore
import inpage from '@src/browser/inpage?script&module'

const { onRuntimeMessage, forwardMessageToBackground } = MessageClient()

const script = document.createElement('script')
script.type = 'module'
script.src = browser.runtime.getURL(inpage)

const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
head.appendChild(script)

window.addEventListener('message', forwardMessageToBackground, false)
browser.runtime.onMessage.addListener(onRuntimeMessage)

export {}
