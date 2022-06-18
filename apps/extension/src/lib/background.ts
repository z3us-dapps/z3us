import browser, { Runtime } from 'webextension-polyfill'
import { accountStore, sharedStore } from '@src/store'
import { BrowserService } from '@src/services/browser'
import { BrowserStorageService } from '@src/services/browser-storage'
import { VaultService } from '@src/services/vault'
import { PORT_NAME, TARGET_BACKGROUND, TARGET_INPAGE, TARGET_POPUP } from '@src/services/messanger'
import watch from '@src/lib/v1/background-watcher'
import NewV1BackgroundInpageActions from '@src/lib/v1/background-inpage'
import NewV1BackgroundPopupActions from '@src/lib/v1/background-popup'
import { CredentialsService } from '@src/services/credentials'

const browserService = new BrowserService()
const storage = new BrowserStorageService(browserService, browser.storage)
const credentials = new CredentialsService(storage)
// eslint-disable-next-line no-restricted-globals
const vault = new VaultService(storage, self.crypto)

const actionsToConfirm: {
	[key: string]: Runtime.Port
} = {}

function sendMessage(port: Runtime.Port, target: string, id: string, request: any, response: any) {
	try {
		port.postMessage({ target, id, request, response })
	} catch (error: unknown) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

function sendInpageMessage(port: Runtime.Port, id: string, request: any, response: any) {
	sendMessage(port, TARGET_INPAGE, id, request, response)
}

function sendPopupMessage(port: Runtime.Port, id: string, request: any, response: any) {
	sendMessage(port, TARGET_POPUP, id, request, response)
}

const v1InpageActionHandlers = NewV1BackgroundInpageActions(browserService, vault, actionsToConfirm, sendInpageMessage)
const v1PopupActionHandlers = NewV1BackgroundPopupActions(
	browserService,
	vault,
	credentials,
	actionsToConfirm,
	sendPopupMessage,
	sendInpageMessage,
)

const inpageActionHandlers = { ...v1InpageActionHandlers }
const popupActionHandlers = { ...v1PopupActionHandlers }

watch()

browser.runtime.onInstalled.addListener(async details => {
	if (details.reason === 'update' && details.previousVersion === '1.0.7') {
		browser.storage.local.clear() // clear state that is no longer compatible
	}
	browser.runtime.setUninstallURL('https://github.com/z3us-dapps/z3us/discussions/150')
	await sharedStore.persist.rehydrate()
	const { setThemeAction, theme } = sharedStore.getState()
	setThemeAction(theme)
})

browser.runtime.onConnect.addListener(port => {
	// eslint-disable-next-line no-console
	console.assert(port.name === PORT_NAME)

	const portMessageIDs: { [key: string]: unknown } = {}

	port.onDisconnect.addListener(() => {
		if (port.error) {
			// eslint-disable-next-line no-console
			console.error(`Disconnected due to an error: ${port.error.message}`)
		}

		Object.keys(portMessageIDs).forEach(async id => {
			delete actionsToConfirm[id]

			await sharedStore.persist.rehydrate()
			const { selectKeystoreId } = sharedStore.getState()
			const useStore = accountStore(selectKeystoreId)
			await useStore.persist.rehydrate()

			const state = useStore.getState()
			state.removePendingActionAction(id)
		})
	})

	port.onMessage.addListener(async message => {
		if (message.target !== TARGET_BACKGROUND) {
			return
		}

		const { id, action, payload, source } = message

		switch (source) {
			case TARGET_INPAGE:
				if (action in inpageActionHandlers) {
					portMessageIDs[id] = {}
					await sharedStore.persist.rehydrate()
					const { selectKeystoreId } = sharedStore.getState()
					const useStore = accountStore(selectKeystoreId)
					await useStore.persist.rehydrate()
					try {
						inpageActionHandlers[action](port, id, payload)
					} catch (error) {
						sendInpageMessage(port, id, payload, { code: 500, error: error?.message || error })
					}
				} else {
					sendInpageMessage(port, id, payload, { code: 400, error: 'Bad request' })
				}
				break
			case TARGET_POPUP:
				if (action in popupActionHandlers) {
					portMessageIDs[id] = {}
					await sharedStore.persist.rehydrate()
					const { selectKeystoreId } = sharedStore.getState()
					const useStore = accountStore(selectKeystoreId)
					await useStore.persist.rehydrate()
					try {
						popupActionHandlers[action](port, id, payload)
					} catch (error) {
						sendInpageMessage(port, id, payload, { code: 500, error: error?.message || error })
					}
				} else {
					sendPopupMessage(port, id, payload, { code: 400, error: 'Bad request' })
				}
				break
			default:
				break
		}
	})
})
