/* eslint-disable prefer-regex-literals */
import { browserSupportsWebauthn, platformAuthenticatorIsAvailable } from '@simplewebauthn/browser'
import {
	generateAuthenticationOptions,
	generateRegistrationOptions,
	verifyAuthenticationResponse,
	verifyRegistrationResponse,
} from '@simplewebauthn/server'
import base64url from 'base64url'

import type { BrowserStorageService } from '@src/services/browser-storage'

export const isWebAuthSupported = async () => browserSupportsWebauthn() && (await platformAuthenticatorIsAvailable())

type Authenticator = {
	credentialID: string
	credentialPublicKey: string
	counter: number
	transports?: AuthenticatorTransport[]
}

type User = {
	id: string
	username: string
	password: string
	currentChallenge?: string
	authenticators: { [key: string]: Authenticator }
}

const credentialsKey = 'z3us-credentials'

const mapAuthenticator = (authenticator: Authenticator) => ({
	id: base64url.toBuffer(authenticator.credentialID),
	type: 'public-key' as PublicKeyCredentialType,
	transports: authenticator.transports,
})

/**
 * https://w3c.github.io/webauthn/#rp-id
 *
 * By default, the RP ID for a WebAuthn operation is set to the caller’s origin's effective domain.
 * This default MAY be overridden by the caller, as long as the caller-specified RP ID value is a registrable domain suffix of or is equal to the caller’s origin's effective domain.
 *
 * Note: An RP ID is based on a host's domain name. It does not itself include a scheme or port, as an origin does.
 * The RP ID of a public key credential determines its scope.
 *
 * I.e., it determines the set of origins on which the public key credential may be exercised, as follows:
 * 	- The RP ID must be equal to the origin's effective domain, or a registrable domain suffix of the origin's effective domain.
 * 	- The origin's scheme must be https.
 * 	- The origin's port is unrestricted.
 */
export class CredentialsService {
	private storage: BrowserStorageService

	constructor(storage: BrowserStorageService) {
		this.storage = storage
	}

	has = async (): Promise<boolean> => {
		try {
			const keystore = await this.storage.getItem(credentialsKey)
			return !!keystore
		} catch (err) {
			return false
		}
	}

	reset = async (): Promise<void> => this.storage.removeItem(credentialsKey)

	generateRegistrationOptions = async (
		rpID: string,
		rpName: string,
		userID: string,
		userName: string,
		userDisplayName: string,
		password: string,
	) => {
		let excludeCredentials = []
		let user: User
		try {
			user = await this.get()
			excludeCredentials = Object.values(user.authenticators).map(mapAuthenticator) // Prevent users from re-registering existing authenticators
			user.password = password
		} catch (error) {
			user = {
				id: userID,
				username: userName,
				password,
				authenticators: {},
			}
		}

		const options = generateRegistrationOptions({
			rpID,
			rpName,
			userID,
			userName,
			userDisplayName,
			excludeCredentials,
			attestationType: 'none',
			authenticatorSelection: {
				authenticatorAttachment: 'platform',
				userVerification: 'required',
				requireResidentKey: false,
			},
		})

		user.currentChallenge = options.challenge
		await this.save(user)

		return options
	}

	verifyRegistrationResponse = async (expectedOrigin: string, expectedRPID: string, credential) => {
		const user = await this.get()
		const { verified, registrationInfo } = await verifyRegistrationResponse({
			credential,
			expectedOrigin,
			expectedRPID,
			expectedChallenge: user.currentChallenge,
		})

		if (verified) {
			const { credentialPublicKey, credentialID, counter } = registrationInfo
			const newAuthenticator: Authenticator = {
				credentialID: base64url.encode(credentialID),
				credentialPublicKey: base64url.encode(credentialPublicKey),
				counter,
			}
			user.authenticators[newAuthenticator.credentialID] = newAuthenticator

			await this.save(user)
		}

		if (!verified) {
			throw new Error('Unauthorized')
		}

		return user.password
	}

	generateAuthenticationOptions = async () => {
		const user = await this.get()
		const options = generateAuthenticationOptions({
			allowCredentials: Object.values(user.authenticators).map(mapAuthenticator),
			userVerification: 'preferred',
		})

		user.currentChallenge = options.challenge
		await this.save(user)

		return options
	}

	verifyAuthenticationResponse = async (expectedOrigin: string, expectedRPID: string, credential) => {
		const user = await this.get()
		const authenticator = user.authenticators[credential.id]

		const { verified, authenticationInfo } = await verifyAuthenticationResponse({
			credential,
			authenticator: {
				credentialID: base64url.toBuffer(authenticator.credentialID),
				credentialPublicKey: base64url.toBuffer(authenticator.credentialPublicKey),
				counter: authenticator.counter,
				transports: authenticator.transports,
			},
			expectedOrigin,
			expectedRPID,
			expectedChallenge: user.currentChallenge,
		})
		const { newCounter } = authenticationInfo
		authenticator.counter = newCounter

		await this.save(user)

		if (!verified) {
			throw new Error('Unauthorized')
		}

		return user.password
	}

	private save = async (credentials: User) => {
		await this.storage.setItem(credentialsKey, JSON.stringify(credentials, null, '\t'))
	}

	private get = async (): Promise<User> => {
		const data = await this.storage.getItem(credentialsKey)
		if (!data) {
			throw new Error('No credentials!')
		}
		return JSON.parse(data) as User
	}
}
