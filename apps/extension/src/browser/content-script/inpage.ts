import browser from 'webextension-polyfill'

// @ts-ignore
import inpage from '@src/browser/inpage?script&module'

export const injectInpageScript = () => {
	const script = document.createElement('script')
	script.type = 'module'
	script.src = browser.runtime.getURL(inpage)

	const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
	head.appendChild(script)
}
