import base64url from 'base64url'
import {
	generateRegistrationOptions,
	verifyRegistrationResponse,
	generateAuthenticationOptions,
	verifyAuthenticationResponse,
} from '@simplewebauthn/server'
import { browserSupportsWebauthn, platformAuthenticatorIsAvailable } from '@simplewebauthn/browser'
import { BrowserStorageService } from '@src/services/browser-storage'

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
		rpName: string,
		rpID: string,
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
			rpName,
			rpID,
			userID,
			userName,
			userDisplayName,
			attestationType: 'none',
			excludeCredentials,
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
