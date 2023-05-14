import browser from 'webextension-polyfill'

import '@src/browser/content-script/messages-handler'
// @ts-ignore
// eslint-disable-next-line import/default
import inpage from '@src/browser/inpage?script'

const script = document.createElement('script')
script.type = 'module'
script.src = browser.runtime.getURL(inpage)

const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
head.appendChild(script)

export {}
