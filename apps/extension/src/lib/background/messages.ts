import browser, { Runtime } from 'webextension-polyfill'
import { accountStore, sharedStore } from '@src/store'
import { BrowserService } from '@src/services/browser'
import { BrowserStorageService } from '@src/services/browser-storage'
import { VaultService } from '@src/services/vault'
import { PORT_NAME, TARGET_BACKGROUND, TARGET_INPAGE, TARGET_POPUP } from '@src/services/messanger'
import NewV1BackgroundInpageActions from '@src/lib/v1/background-inpage'
import NewV1BackgroundPopupActions from '@src/lib/v1/background-popup'
import { deletePendingAction } from '@src/services/actions-pending'
import { subscribeToEvents } from '@src/lib/background/events'
// import { CredentialsService } from '@src/services/credentials'

const browserService = new BrowserService()
const storage = new BrowserStorageService(browserService, browser.storage)
// const credentials = new CredentialsService(storage)
// eslint-disable-next-line no-restricted-globals
const vault = new VaultService(storage, self.crypto)

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

const popupURL = new URL(browser.runtime.getURL(''))

const v1InpageActionHandlers = NewV1BackgroundInpageActions(browserService, vault, sendInpageMessage)
const v1PopupActionHandlers = NewV1BackgroundPopupActions(
	browserService,
	vault,
	// credentials,
	sendPopupMessage,
	sendInpageMessage,
)

const inpageActionHandlers = { ...v1InpageActionHandlers }
const popupActionHandlers = { ...v1PopupActionHandlers }

export const handleConnect = async port => {
	// eslint-disable-next-line no-console
	console.assert(port.name === PORT_NAME)

	let isPopup = false
	if (port.sender?.url) {
		isPopup = new URL(port.sender.url).hostname === popupURL.hostname
	}

	const portMessageIDs: { [key: string]: unknown } = {}

	port.onMessage.addListener(async message => {
		if (message.target !== TARGET_BACKGROUND) {
			return
		}

		const { id, action, payload, source } = message

		switch (source) {
			case TARGET_INPAGE:
				if (isPopup) return
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
				if (!isPopup) return
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

	let unsubscribeFromEvents = () => {}

	port.onDisconnect.addListener(() => {
		if (port.error) {
			// eslint-disable-next-line no-console
			console.error(`Disconnected due to an error: ${port.error.message}`)
		}

		unsubscribeFromEvents()

		Object.keys(portMessageIDs).forEach(async id => {
			await deletePendingAction(id)

			await sharedStore.persist.rehydrate()
			const { selectKeystoreId } = sharedStore.getState()
			const useStore = accountStore(selectKeystoreId)
			await useStore.persist.rehydrate()

			const state = useStore.getState()
			state.removePendingActionAction(id)
		})
	})

	if (!isPopup) {
		unsubscribeFromEvents = subscribeToEvents(port, sendMessage)
	}

	const timer = setTimeout(
		() => {
			clearTimeout(timer)
			unsubscribeFromEvents()
			port.disconnect()
		},
		250e3,
		port,
	)
}
