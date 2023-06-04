import { startAuthentication, startRegistration } from '@simplewebauthn/browser'
import browser from 'webextension-polyfill'

import {
	AUTH_AUTHENTICATION_OPTIONS,
	AUTH_HAS,
	AUTH_REGISTRATION_OPTIONS,
	AUTH_RESET,
	AUTH_VERIFY_AUTHENTICATION,
	AUTH_VERIFY_REGISTRATION,
	GET,
	HAS,
	LOCK,
	NEW,
	PING,
	REMOVE,
	UNLOCK,
} from '@src/lib/v1/actions'
import { MessageService, PORT_NAME } from '@src/services/messanger'
import type { SigningKeyType } from '@src/types'

export const rpName = 'Z3US'

const messanger = new MessageService('extension', null, null)

const connectNewPort = () => {
	const port = browser.runtime.connect({ name: PORT_NAME })
	port.onDisconnect.addListener(() => {
		if (port.error) {
			// eslint-disable-next-line no-console
			console.error(`Disconnected due to an error: ${port.error.message}`)
		}
		connectNewPort()
	})

	messanger.initPort(port)
}

connectNewPort()

export const useMessanger = () => ({
	messanger,

	sendResponseAction: async (action: string, data: any = {}) => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionReply(action, data)
	},

	hasKeystoreAction: async () => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		const hasKeystore = await messanger.sendActionMessageFromPopup(HAS, null)
		return !!hasKeystore
	},

	createWalletAction: (type: SigningKeyType, secret: string, password: string, index: number) => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(NEW, {
			type,
			secret,
			password,
			index,
		})
	},

	getWalletAction: (password: string) => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(GET, { password })
	},

	unlockWalletAction: (password: string) => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(UNLOCK, { password })
	},

	removeWalletAction: async () => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionMessageFromPopup(REMOVE, null)
	},

	lockAction: async () => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionMessageFromPopup(LOCK, null)
	},

	pingAction: async () => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionMessageFromPopup(PING, null)
	},

	hasAuthAction: async () => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(AUTH_HAS, null)
	},

	removeCredentialAction: async () => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}

		return messanger.sendActionMessageFromPopup(AUTH_RESET, null)
	},

	registerCredentialAction: async (userID: string, userName: string, userDisplayName: string, password: string) => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}

		const options = await messanger.sendActionMessageFromPopup(AUTH_REGISTRATION_OPTIONS, {
			rpID: window.location.hostname,
			rpName,
			userID,
			userName,
			userDisplayName,
			password,
		})

		const credential = await startRegistration(options)

		return messanger.sendActionMessageFromPopup(AUTH_VERIFY_REGISTRATION, {
			expectedRPID: window.location.hostname,
			expectedOrigin: window.location.origin,
			credential,
		})
	},

	authenticateAction: async () => {
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}

		const options = await messanger.sendActionMessageFromPopup(AUTH_AUTHENTICATION_OPTIONS, null)

		const credential = await startAuthentication(options)

		return messanger.sendActionMessageFromPopup(AUTH_VERIFY_AUTHENTICATION, {
			expectedRPID: window.location.hostname,
			expectedOrigin: window.location.origin,
			credential,
		})
	},
})
