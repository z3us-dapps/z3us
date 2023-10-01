import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type {
	AccountProof,
	AccountsRequestItem,
	AuthLoginWithChallengeRequestItem,
	AuthLoginWithChallengeRequestResponseItem,
	AuthLoginWithoutChallengeRequestResponseItem,
	AuthUsePersonaRequestItem,
	AuthUsePersonaRequestResponseItem,
	PersonaDataRequestItem,
	PersonaDataRequestResponseItem,
	WalletAuthorizedRequestItems,
} from '@radixdlt/radix-dapp-toolkit'
import { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { getDAppDataToSign, proofCurve, signatureWithPublicKeyToJSON } from '@src/crypto/signature'
import { useMessageClient } from '@src/hooks/use-message-client'
import { useSelectAccountsModal } from '@src/hooks/use-select-accounts-modal'
import { useSelectPersonaModal } from '@src/hooks/use-select-persona-modal'
import { useSignModal } from '@src/hooks/use-sign-modal'

interface IProps {
	interaction: WalletInteractionWithTabId
}

const messages = defineMessages({
	select_persona: {
		id: 'interaction.home.authorized_request_interaction.select_persona',
		defaultMessage: 'Select persona',
	},
	select_accounts: {
		id: 'interaction.home.authorized_request_interaction.select_accounts',
		defaultMessage: 'Select accounts',
	},
	login: {
		id: 'interaction.home.authorized_request_interaction.login',
		defaultMessage: 'Login',
	},
	share: {
		id: 'interaction.home.authorized_request_interaction.share',
		defaultMessage: 'Share',
	},
	account_challenge: {
		id: 'interaction.home.authorized_request_interaction.account_challenge',
		defaultMessage: 'To confirm ownership, sign challenge with account {label}',
	},
	persona_challenge: {
		id: 'interaction.home.authorized_request_interaction.persona_challenge',
		defaultMessage: 'To confirm ownership, sign challenge with persona {label}',
	},
	unknown_account: {
		id: 'interaction.home.authorized_request_interaction.unknown_account',
		defaultMessage: 'Selected account: {appearanceId}',
	},
})

export const AuthorizedRequestInteraction: React.FC<IProps> = ({ interaction }) => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const client = useMessageClient()
	const networkId = useNetworkId()
	const confirm = useSignModal()
	const selectPersona = useSelectPersonaModal()
	const selectAccounts = useSelectAccountsModal()

	const { personaIndexes, accountIndexes, addressBook } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
		accountIndexes: state.accountIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

	const request = interaction.items as WalletAuthorizedRequestItems

	const [selectedPersona, setSelectedPersona] = useState<number>(
		request.auth.discriminator === 'usePersona'
			? +Object.keys(personaIndexes).find(
					idx => personaIndexes[idx].identityAddress === (request.auth as AuthUsePersonaRequestItem).identityAddress,
			  )
			: -1,
	)
	const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
	const [auth, setAuth] = useState<
		| AuthUsePersonaRequestResponseItem
		| AuthLoginWithChallengeRequestResponseItem
		| AuthLoginWithoutChallengeRequestResponseItem
	>()

	const handleSelectPersona = async () => {
		const index = await selectPersona()
		if (index > -1) {
			setSelectedPersona(index)
		}
	}

	const handleSelectAccounts = async () => {
		const { numberOfAccounts } = request.oneTimeAccounts || request.ongoingAccounts
		const indexes = await selectAccounts(numberOfAccounts.quantity, numberOfAccounts.quantifier === 'exactly')
		if (indexes?.length > 0) {
			setSelectedAccounts(indexes)
		}
	}

	const buildPersonaData = async (
		req?: PersonaDataRequestItem,
	): Promise<PersonaDataRequestResponseItem | undefined> => {
		if (!req) {
			return undefined
		}
		throw new Error('Not implemented reset')
	}

	const buildAccounts = async (req?: AccountsRequestItem) => {
		if (!req) return undefined

		const { challenge } = req
		let proofs: AccountProof[]
		if (challenge) {
			proofs = await Promise.all<AccountProof>(
				selectedAccounts.map(async (idx, appearanceId) => {
					const label =
						addressBook[accountIndexes[idx].address]?.name ||
						intl.formatMessage(messages.unknown_account, { appearanceId })
					const password = await confirm(intl.formatMessage(messages.account_challenge, { label }))
					const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
						'account',
						password,
						getDAppDataToSign(
							challenge,
							(interaction.metadata as any).origin,
							interaction.metadata.dAppDefinitionAddress,
						),
						idx,
					)
					const signature = signatureWithPublicKeyToJSON(signatureWithPublicKey)

					return {
						accountAddress: accountIndexes[idx].address,
						proof: {
							signature: signature.signature,
							publicKey: signature.publicKey,
							curve: proofCurve(signature.curve),
						},
					}
				}),
			)
			proofs = proofs.filter(proof => proof !== null)
		}

		const accounts = selectedAccounts.map((idx, appearanceId) => ({
			address: accountIndexes[idx].address,
			label:
				addressBook[accountIndexes[idx].address]?.name ||
				intl.formatMessage(messages.unknown_account, { appearanceId }),
			appearanceId,
		}))

		return { accounts, challenge, proofs }
	}

	const loginWithChallenge = async ({
		challenge,
		discriminator,
	}: AuthLoginWithChallengeRequestItem): Promise<AuthLoginWithChallengeRequestResponseItem> => {
		const persona = personaIndexes[selectedPersona]
		let proof: AuthLoginWithChallengeRequestResponseItem['proof']
		if (challenge) {
			const password = await confirm(intl.formatMessage(messages.persona_challenge, { label: persona.label }))
			const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
				'persona',
				password,
				getDAppDataToSign(challenge, (interaction.metadata as any).origin, interaction.metadata.dAppDefinitionAddress),
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

	const handleLogin = async () => {
		switch (request.auth.discriminator) {
			case 'usePersona':
				setAuth({
					discriminator: 'usePersona',
					persona: personaIndexes[selectedPersona],
				})
				break
			case 'loginWithChallenge':
				setAuth(await loginWithChallenge(request.auth))
				break
			case 'loginWithoutChallenge':
				setAuth({
					discriminator: 'loginWithoutChallenge',
					persona: personaIndexes[selectedPersona],
				})
				break
			default:
				break
		}
	}

	const handleShare = async () => {
		browser.tabs
			.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					discriminator: 'success',
					items: {
						discriminator: 'authorizedRequest',
						auth,
						oneTimeAccounts: await buildAccounts(request.oneTimeAccounts),
						oneTimePersonaData: await buildPersonaData(request.oneTimePersonaData),
						ongoingAccounts: await buildAccounts(request.ongoingAccounts),
						ongoingPersonaData: await buildPersonaData(request.ongoingPersonaData),
					},
					interactionId,
				}),
			)
			.catch(error =>
				browser.tabs.sendMessage(
					interaction.fromTabId,
					createRadixMessage.walletResponse(radixMessageSource.offScreen, {
						discriminator: 'failure',
						error: error?.message,
						interactionId,
					}),
				),
			)
			.finally(() => window.close())
	}

	if (interaction.items.discriminator !== 'authorizedRequest') {
		return null
	}

	return (
		<Box>
			<Text>
				{`Selected: ${personaIndexes[selectedPersona]?.label} (${personaIndexes[selectedPersona]?.identityAddress})`}
			</Text>
			<Button
				onClick={handleSelectPersona}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				disabled={interaction.items.auth.discriminator === 'usePersona'}
			>
				{intl.formatMessage(messages.select_persona)}
			</Button>
			<Button
				onClick={handleLogin}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				disabled={!personaIndexes[selectedPersona] || !!auth}
			>
				{intl.formatMessage(messages.login)}
			</Button>
			<Text>{`Selected: ${selectedAccounts.length} accounts`}</Text>
			<Button
				onClick={handleSelectAccounts}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				disabled={!personaIndexes[selectedPersona]}
			>
				{intl.formatMessage(messages.select_accounts)}
			</Button>
			<Button
				onClick={handleShare}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				disabled={selectedAccounts.length === 0}
			>
				{intl.formatMessage(messages.share)}
			</Button>
		</Box>
	)
}
