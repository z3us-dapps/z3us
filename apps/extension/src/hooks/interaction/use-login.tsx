import type {
	AuthLoginWithChallengeRequestItem,
	AuthLoginWithChallengeRequestResponseItem,
	AuthLoginWithoutChallengeRequestItem,
	AuthLoginWithoutChallengeRequestResponseItem,
	AuthUsePersonaRequestItem,
	AuthUsePersonaRequestResponseItem,
} from '@radixdlt/radix-dapp-toolkit'
import { defineMessages, useIntl } from 'react-intl'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { getDAppDataToSign, proofCurve, signatureWithPublicKeyToJSON } from '@src/crypto/signature'

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
	const networkId = useNetworkId()
	const confirm = useSignModal()

	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
	}))

	const loginWithChallenge = async (
		selectedPersona: number,
		req?: AuthLoginWithChallengeRequestItem,
		metadata?: any,
	): Promise<AuthLoginWithChallengeRequestResponseItem> => {
		if (!req) return undefined
		const { challenge, discriminator } = req
		const persona = personaIndexes[selectedPersona]
		let proof: AuthLoginWithChallengeRequestResponseItem['proof']
		if (challenge) {
			const password = await confirm(intl.formatMessage(messages.persona_challenge, { label: persona.label }))
			const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
				'persona',
				password,
				getDAppDataToSign(challenge, metadata.origin, metadata.dAppDefinitionAddress),
				selectedPersona,
			)
			const signature = signatureWithPublicKeyToJSON(signatureWithPublicKey)
			proof = {
				signature: signature.signature,
				publicKey: signature.publicKey,
				curve: proofCurve(signature.curve),
			}
		}

		return { discriminator, challenge, persona, proof }
	}

	const login = async (
		selectedPersona: number,
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
