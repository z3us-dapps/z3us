import type { Keystore } from 'packages/ui/src/store/types'
import { generateId } from 'packages/ui/src/utils/generate-id'

import { DAPP_NAME } from 'ui/src/constants/dapp'

function parseSignature(signature) {
	const usignature = new Uint8Array(signature)
	const rStart = usignature[4] === 0 ? 5 : 4
	const rEnd = rStart + 32
	const sStart = usignature[rEnd + 2] === 0 ? rEnd + 3 : rEnd + 2
	const r = usignature.slice(rStart, rEnd)
	const s = usignature.slice(sStart)
	return new Uint8Array([...r, ...s])
}

export async function register(
	keystore: Keystore,
	password: string,
	authenticatorAttachment: AuthenticatorAttachment,
): Promise<{
	credentialId: string
	publicKey: string
}> {
	const challenge = generateId()
	const options: CredentialCreationOptions = {
		publicKey: {
			challenge: Buffer.from(challenge, 'utf-8'),
			rp: {
				name: `${DAPP_NAME} Wallet`,
			},
			user: {
				id: Buffer.from(password, 'utf-8'),
				name: `${DAPP_NAME}: ${keystore.name}`,
				displayName: keystore.name,
			},
			pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
			authenticatorSelection: {
				authenticatorAttachment,
				requireResidentKey: true,
				userVerification: 'discouraged',
			},
			timeout: 6e4,
		},
	}
	const credential = await navigator.credentials.create(options)

	const { response, rawId } = credential as PublicKeyCredential
	const { clientDataJSON } = response

	const clientData = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(clientDataJSON)))
	if (clientData.type !== 'webauthn.create') throw new Error('Invalid auth type')
	if (clientData.origin !== window.location.origin) throw new Error('Origin does not match')
	if (Buffer.from(clientData.challenge, 'base64').toString() !== challenge) throw new Error('Challenge does not match')

	return {
		credentialId: Buffer.from(rawId).toString('hex'),
		publicKey: Buffer.from((response as AuthenticatorAttestationResponse).getPublicKey()).toString('hex'),
	}
}

export async function login(keystore: Keystore): Promise<string> {
	if (!keystore.webAuthn) return ''

	const challenge = generateId()
	const req: CredentialRequestOptions = {
		publicKey: {
			challenge: Buffer.from(challenge, 'utf-8'),
			allowCredentials: [
				{
					type: 'public-key',
					id: Buffer.from(keystore.webAuthn.credentialId, 'hex'),
				},
			],
			userVerification: 'discouraged',
			timeout: 2e4,
		},
	}

	const assertion = await navigator.credentials.get(req)
	const { signature, clientDataJSON, authenticatorData, userHandle } = (assertion as any)
		.response as AuthenticatorAssertionResponse

	const clientData = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(clientDataJSON)))
	if (clientData.type !== 'webauthn.get') throw new Error('Invalid auth type')
	if (clientData.origin !== window.location.origin) throw new Error('Origin does not match')
	if (Buffer.from(clientData.challenge, 'base64').toString() !== challenge) throw new Error('Challenge does not match')

	const importedKey = await crypto.subtle.importKey(
		'spki',
		Buffer.from(keystore.webAuthn.publicKey, 'hex'),
		{ name: 'ECDSA', namedCurve: 'P-256' },
		false,
		['verify'],
	)

	const uAuthenticatorData = new Uint8Array(authenticatorData)
	const uClientDataHash = new Uint8Array(await crypto.subtle.digest('SHA-256', clientDataJSON))

	const signedData = new Uint8Array(uAuthenticatorData.length + uClientDataHash.length)
	signedData.set(uAuthenticatorData)
	signedData.set(uClientDataHash, uAuthenticatorData.length)

	const verificationResult = await crypto.subtle.verify(
		{ name: 'ECDSA', hash: { name: 'SHA-256' } },
		importedKey,
		parseSignature(signature),
		signedData.buffer,
	)
	if (verificationResult === true) {
		const userId = String.fromCharCode.apply(null, new Uint8Array(userHandle))
		return userId
	}
	return ''
}
