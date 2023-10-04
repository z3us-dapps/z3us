/* eslint-disable no-case-declarations */
import type {
	AuthLoginWithChallengeRequestItem,
	AuthLoginWithChallengeRequestResponseItem,
	AuthLoginWithoutChallengeRequestItem,
	AuthLoginWithoutChallengeRequestResponseItem,
	AuthUsePersonaRequestItem,
	AuthUsePersonaRequestResponseItem,
} from '@radixdlt/radix-dapp-toolkit'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import type { Persona } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

import { getDAppDataToSign, proofCurve, signatureWithPublicKeyToJSON } from '@src/crypto/signature'

import { useLedgerClient } from '../use-ledger-client'
import { useMessageClient } from '../use-message-client'
import { useSignModal } from '../use-sign-modal'

const messages = defineMessages({
	persona_challenge: {
		id: 'hooks.interaction.login.persona_challenge',
		defaultMessage: 'To confirm ownership, sign challenge with persona {label}',
	},
})

export const useLogin = () => {
	const intl = useIntl()
	const client = useMessageClient()
	const ledger = useLedgerClient()
	const networkId = useNetworkId()
	const confirm = useSignModal()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
	}))

	const sign = useCallback(
		async (
			persona: Persona,
			password: string,
			challenge: string,
			metadata: { origin: string; dAppDefinitionAddress: string },
		): Promise<AuthLoginWithChallengeRequestResponseItem['proof']> => {
			switch (keystore?.type) {
				case KeystoreType.LOCAL:
					const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
						persona.curve,
						persona.derivationPath,
						password,
						getDAppDataToSign(challenge, metadata.origin, metadata.dAppDefinitionAddress),
					)
					const signature = signatureWithPublicKeyToJSON(signatureWithPublicKey)
					return {
						signature: signature.signature,
						publicKey: signature.publicKey,
						curve: proofCurve(signature.curve),
					}
				case KeystoreType.HARDWARE:
					const [ledgerSignature] = await ledger.signChallenge([persona], password, challenge, metadata)
					return {
						signature: ledgerSignature.signature,
						publicKey: ledgerSignature.derivedPublicKey.publicKey,
						curve: ledgerSignature.derivedPublicKey.curve,
					}
				default:
					throw new Error(`Can not sign with keystore type: ${keystore?.type}`)
			}
		},
		[keystore],
	)

	const loginWithChallenge = async (
		selectedPersona: string,
		req?: AuthLoginWithChallengeRequestItem,
		metadata?: any,
	): Promise<AuthLoginWithChallengeRequestResponseItem> => {
		if (!req) return undefined
		const { challenge, discriminator } = req
		const persona = personaIndexes[selectedPersona]
		let proof: AuthLoginWithChallengeRequestResponseItem['proof']
		if (challenge) {
			const password = await confirm(intl.formatMessage(messages.persona_challenge, { label: persona.label }))
			proof = await sign(persona, password, challenge, metadata)
		}

		return { discriminator, challenge, persona, proof }
	}

	const login = async (
		selectedPersona: string,
		auth?: AuthLoginWithChallengeRequestItem | AuthLoginWithoutChallengeRequestItem | AuthUsePersonaRequestItem,
		metadata?: any,
	): Promise<
		| AuthUsePersonaRequestResponseItem
		| AuthLoginWithChallengeRequestResponseItem
		| AuthLoginWithoutChallengeRequestResponseItem
		| undefined
	> => {
		switch (auth.discriminator) {
			case 'usePersona':
			case 'loginWithoutChallenge':
				return {
					discriminator: auth.discriminator,
					persona: personaIndexes[selectedPersona],
				}
			case 'loginWithChallenge':
				return loginWithChallenge(selectedPersona, auth, metadata)
			default:
				return undefined
		}
	}

	return login
}
