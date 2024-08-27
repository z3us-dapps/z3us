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

import { usePersonaIndexes } from 'ui/src/hooks/use-persona-indexes'
import { useSharedStore } from 'ui/src/hooks/use-store'
import type { Keystore, Persona } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

import { getDAppDataToSign, proofCurve } from '@src/crypto/signature'
import { usePasswordModal } from '@src/hooks/modal/use-password-modal'
import { useLedgerClient } from '@src/hooks/use-ledger-client'
import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	persona_challenge_title: {
		id: 'BVfFiI',
		defaultMessage: 'Sign challenge',
	},
	persona_challenge: {
		id: 'HMBkUU',
		defaultMessage: 'To confirm ownership, sign challenge with persona {label}',
	},
})

export const useLogin = () => {
	const intl = useIntl()
	const client = useMessageClient()
	const ledger = useLedgerClient()
	const confirm = usePasswordModal()
	const personaIndexes = usePersonaIndexes()

	const { selectedKeystore } = useSharedStore(state => ({
		selectedKeystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const sign = useCallback(
		async (
			keystore: Keystore,
			persona: Persona,
			challenge: string,
			metadata: { origin: string; dAppDefinitionAddress: string },
		): Promise<AuthLoginWithChallengeRequestResponseItem['proof']> => {
			switch (keystore?.type) {
				case KeystoreType.LOCAL:
					const password = await confirm({
						title: intl.formatMessage(messages.persona_challenge_title),
						content: intl.formatMessage(messages.persona_challenge, { label: persona.label }),
					})
					const { signature, publicKey, curve } = await client.signToSignatureWithPublicKey(
						selectedKeystore,
						persona.curve,
						persona.derivationPath,
						password,
						getDAppDataToSign(challenge, metadata.origin, metadata.dAppDefinitionAddress),
						persona.combinedKeystoreId,
					)
					return {
						signature,
						publicKey,
						curve: proofCurve(curve),
					}
				case KeystoreType.HARDWARE:
					const [ledgerSignature] = await ledger.signChallenge(keystore, [persona], challenge, metadata)
					return {
						signature: ledgerSignature.signature,
						publicKey: ledgerSignature.derivedPublicKey.publicKey,
						curve: ledgerSignature.derivedPublicKey.curve,
					}
				case KeystoreType.COMBINED:
					return sign(keystore.keySources[persona.combinedKeystoreId], persona, challenge, metadata)
				default:
					throw new Error(`Can not sign with keystore type: ${keystore?.type}`)
			}
		},
		[client, ledger, selectedKeystore, confirm, intl],
	)

	const loginWithChallenge = useCallback(
		async (
			selectedPersona: string,
			req?: AuthLoginWithChallengeRequestItem,
			metadata?: any,
		): Promise<AuthLoginWithChallengeRequestResponseItem> => {
			if (!req) return undefined
			const { challenge, discriminator } = req
			const persona = personaIndexes[selectedPersona]
			let proof: AuthLoginWithChallengeRequestResponseItem['proof']
			if (challenge) {
				proof = await sign(selectedKeystore, persona, challenge, metadata)
			}

			return { discriminator, challenge, persona, proof }
		},
		[personaIndexes, selectedKeystore, sign],
	)

	const login = useCallback(
		async (
			selectedPersona: string,
			auth?: AuthLoginWithChallengeRequestItem | AuthLoginWithoutChallengeRequestItem | AuthUsePersonaRequestItem,
			metadata?: any,
		): Promise<
			| AuthUsePersonaRequestResponseItem
			| AuthLoginWithChallengeRequestResponseItem
			| AuthLoginWithoutChallengeRequestResponseItem
			| undefined
		> => {
			switch (auth?.discriminator) {
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
		},
		[loginWithChallenge, personaIndexes],
	)

	return login
}
