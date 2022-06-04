import { GetState, SetState } from 'zustand'
import { MessageService } from '@src/services/messanger'
import {
	HAS,
	LOCK,
	NEW,
	REMOVE,
	UNLOCK,
	AUTH_HAS,
	AUTH_RESET,
	AUTH_REGISTRATION_OPTIONS,
	AUTH_VERIFY_REGISTRATION,
	AUTH_AUTHENTICATION_OPTIONS,
	AUTH_VERIFY_AUTHENTICATION,
} from '@src/lib/actions'
import { HDMasterSeed } from '@radixdlt/crypto'
import { startRegistration, startAuthentication } from '@simplewebauthn/browser'
import { BackgroundStore, SharedStore } from './types'

export const rpName = 'Z3US'

export const factory = (set: SetState<SharedStore>, get: GetState<SharedStore>): BackgroundStore => ({
	messanger: null,

	setMessangerAction: (messanger: MessageService) => {
		set(state => {
			state.messanger = messanger
		})
	},

	sendResponseAction: async (action: string, data: any = {}) => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionReply(action, data)
	},

	hasKeystoreAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		const hasKeystore = await messanger.sendActionMessageFromPopup(HAS, null)
		return !!hasKeystore
	},

	createWalletAction: async (words: string[], password: string) => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		const { seed } = await messanger.sendActionMessageFromPopup(NEW, {
			words,
			password,
		})

		return HDMasterSeed.fromSeed(Buffer.from(seed, 'hex'))
	},

	unlockWalletAction: async (password: string) => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		const { seed } = await messanger.sendActionMessageFromPopup(UNLOCK, password)

		return HDMasterSeed.fromSeed(Buffer.from(seed, 'hex'))
	},

	removeWalletAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionMessageFromPopup(REMOVE, null)
	},

	lockAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		await messanger.sendActionMessageFromPopup(LOCK, null)
		set(state => {
			state.isHardwareWallet = false
			state.hardwareWallet = null
			state.masterSeed = null
		})
	},

	hasAuthAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}
		return messanger.sendActionMessageFromPopup(AUTH_HAS, null)
	},

	removeCredentialAction: async () => {
		const { messanger } = get()
		if (!messanger) {
			throw new Error('Messanger not initialized!')
		}

		return messanger.sendActionMessageFromPopup(AUTH_RESET, null)
	},

	registerCredentialAction: async (userID: string, userName: string, userDisplayName: string, password: string) => {
		const { messanger } = get()
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
		const { messanger } = get()
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
