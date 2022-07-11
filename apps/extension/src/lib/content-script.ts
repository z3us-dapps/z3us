import browser from 'webextension-polyfill'
// import init from 'pte-manifest-compiler'
import { PORT_NAME, TARGET_BACKGROUND, TARGET_INPAGE } from '../services/messanger'

let port = browser.runtime.connect({ name: PORT_NAME })

port.onDisconnect.addListener(() => {
	if (port.error) {
		// eslint-disable-next-line no-console
		console.error(`Disconnected due to an error: ${port.error.message}`)
	}
	console.warn('Disconnected, reconnecting...')
	port = browser.runtime.connect({ name: PORT_NAME })
})

const script = document.createElement('script')
script.type = 'module'
script.src = browser.runtime.getURL('assets/inpage.js')

const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
head.appendChild(script)

// const wasmPath = browser.runtime.getURL('pte_manifest_compiler_bg.wasm')
// // eslint-disable-next-line no-console
// init(wasmPath).catch(console.error)

port.onMessage.addListener(message => {
	if (message.target !== TARGET_INPAGE) {
		return
	}

	window.postMessage({ ...message, source: TARGET_BACKGROUND })
})

window.addEventListener(
	'message',
	event => {
		if (event.source !== window) {
			return
		}
		const message = event.data
		if (message.target !== TARGET_BACKGROUND) {
			return
		}

		port.postMessage({ ...message, source: TARGET_INPAGE })
	},
	false,
)
