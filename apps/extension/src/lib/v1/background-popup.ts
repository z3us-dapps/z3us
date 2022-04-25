import { store as useStore } from '@src/store'
import { Runtime } from 'webextension-polyfill'
import { BrowserService } from '@src/services/browser'
import { VaultService } from '@src/services/vault'
import { CredentialsService } from '@src/services/credentials'
import {
	CONFIRM,
	HAS,
	NEW,
	GET,
	RESET,
	LOCK,
	UNLOCK,
	AUTH_HAS,
	AUTH_RESET,
	AUTH_REGISTRATION_OPTIONS,
	AUTH_VERIFY_REGISTRATION,
	AUTH_AUTHENTICATION_OPTIONS,
	AUTH_VERIFY_AUTHENTICATION,
} from '../actions'

export default function NewV1BackgroundPopupActions(
	browser: BrowserService,
	vault: VaultService,
	credentials: CredentialsService,
	actionsToConfirm: { [key: string]: Runtime.Port },
	sendPopupMessage: (port: Runtime.Port, id: string, request: any, response: any) => void,
	sendInpageMessage: (port: Runtime.Port, id: string, request: any, response: any) => void,
) {
	async function confirm(popupPort: Runtime.Port, id: string, payload: { request: any; value: any }) {
		if (!payload.value?.code || payload.value?.code === 200) {
			browser.closeCurrentPopup()
		}

		const port = actionsToConfirm[id]
		if (!port) {
			return
		}

		sendInpageMessage(port, id, payload.request, payload.value)
		delete actionsToConfirm[id]

		const state = useStore.getState()
		state.removePendingActionAction(id)
	}

	async function reset(port: Runtime.Port, id: string, payload: any) {
		try {
			await vault.reset()
			sendPopupMessage(port, id, payload, {})
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function lock(port: Runtime.Port, id: string, payload: any) {
		try {
			await vault.lock()
			sendPopupMessage(port, id, payload, {})
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function get(port: Runtime.Port, id: string, payload: any) {
		try {
			const resp = await vault.get()
			sendPopupMessage(port, id, payload, resp)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function hasKeystore(port: Runtime.Port, id: string, payload: any) {
		try {
			const has = await vault.has()
			sendPopupMessage(port, id, payload, has)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function newKeychain(port: Runtime.Port, id: string, payload: { words: string[]; password: string }) {
		try {
			const resp = await vault.new(payload.password, payload.words)
			sendPopupMessage(port, id, payload, resp)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function unlock(port: Runtime.Port, id: string, payload: string) {
		try {
			const resp = await vault.unlock(payload)
			sendPopupMessage(port, id, payload, resp)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function authHas(port: Runtime.Port, id: string, payload) {
		try {
			const resp = await credentials.has()
			sendPopupMessage(port, id, payload, resp)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function authReset(port: Runtime.Port, id: string, payload) {
		try {
			const resp = await credentials.reset()
			sendPopupMessage(port, id, payload, resp)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function authRegistrationOptions(
		port: Runtime.Port,
		id: string,
		payload: {
			rpName: string
			rpID: string
			userID: string
			userName: string
			userDisplayName: string
			password: string
		},
	) {
		try {
			const resp = await credentials.generateRegistrationOptions(
				payload.rpID,
				payload.rpName,
				payload.userID,
				payload.userName,
				payload.userDisplayName,
				payload.password,
			)
			sendPopupMessage(port, id, payload, resp)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function authVerifyRegistration(
		port: Runtime.Port,
		id: string,
		payload: {
			expectedOrigin: string
			expectedRPID: string
			credential
		},
	) {
		try {
			const resp = await credentials.verifyRegistrationResponse(
				payload.expectedOrigin,
				payload.expectedRPID,
				payload.credential,
			)
			sendPopupMessage(port, id, payload, resp)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function authAuthenticationOptions(port: Runtime.Port, id: string, payload) {
		try {
			const resp = await credentials.generateAuthenticationOptions()
			sendPopupMessage(port, id, payload, resp)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function authVerifyAuthentication(
		port: Runtime.Port,
		id: string,
		payload: {
			expectedOrigin: string
			expectedRPID: string
			credential
		},
	) {
		try {
			const resp = await credentials.verifyAuthenticationResponse(
				payload.expectedOrigin,
				payload.expectedRPID,
				payload.credential,
			)
			sendPopupMessage(port, id, payload, resp)
		} catch (error: any) {
			sendPopupMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	return {
		[CONFIRM]: confirm,
		[HAS]: hasKeystore,
		[NEW]: newKeychain,
		[GET]: get,
		[RESET]: reset,
		[LOCK]: lock,
		[UNLOCK]: unlock,
		[AUTH_HAS]: authHas,
		[AUTH_RESET]: authReset,
		[AUTH_REGISTRATION_OPTIONS]: authRegistrationOptions,
		[AUTH_VERIFY_REGISTRATION]: authVerifyRegistration,
		[AUTH_AUTHENTICATION_OPTIONS]: authAuthenticationOptions,
		[AUTH_VERIFY_AUTHENTICATION]: authVerifyAuthentication,
	}
}
