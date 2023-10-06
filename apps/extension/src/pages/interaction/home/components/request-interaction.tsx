import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { WalletAuthorizedRequestItems, WalletUnauthorizedRequestItems } from '@radixdlt/radix-dapp-toolkit'
import { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { Persona } from 'ui/src/store/types'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { useAccountsData } from '@src/hooks/interaction/use-accounts-data'
import { useLogin } from '@src/hooks/interaction/use-login'
import { usePersonaData } from '@src/hooks/interaction/use-persona-data'
import { useSelectAccountsModal } from '@src/hooks/use-select-accounts-modal'
import { useSelectPersonaModal } from '@src/hooks/use-select-persona-modal'

interface IProps {
	interaction: WalletInteractionWithTabId
}

const messages = defineMessages({
	continue: {
		id: 'interaction.home.authorized_request_interaction.continue',
		defaultMessage: 'Continue',
	},
	select_persona: {
		id: 'interaction.home.authorized_request_interaction.select_persona',
		defaultMessage: 'Select persona',
	},
	select_accounts: {
		id: 'interaction.home.authorized_request_interaction.select_accounts',
		defaultMessage: 'Select accounts',
	},
})

function getInitialPersona(
	personaIndexes: { [address: string]: Persona },
	request: WalletAuthorizedRequestItems | WalletUnauthorizedRequestItems,
): string {
	if (request.discriminator === 'authorizedRequest' && request.auth.discriminator === 'usePersona') {
		const { identityAddress } = request.auth
		return Object.keys(personaIndexes).find(address => address === identityAddress)
	}
	return ''
}

export const RequestInteraction: React.FC<IProps> = ({ interaction }) => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const networkId = useNetworkId()
	const selectPersona = useSelectPersonaModal()
	const selectAccounts = useSelectAccountsModal()

	const login = useLogin()
	const buildAccounts = useAccountsData()
	const buildPersonaData = usePersonaData()

	const { personaIndexes } = useNoneSharedStore(state => ({
		personaIndexes: state.personaIndexes[networkId] || {},
	}))

	const request = interaction.items as WalletAuthorizedRequestItems //| WalletUnauthorizedRequestItems

	const [selectedPersona, setSelectedPersona] = useState<string>(getInitialPersona(personaIndexes, request))
	const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

	const handleSelectPersona = async () => {
		setSelectedPersona(await selectPersona())
	}

	const handleSelectAccounts = async () => {
		const { numberOfAccounts } = request.ongoingAccounts || request.oneTimeAccounts
		setSelectedAccounts(await selectAccounts(numberOfAccounts.quantity, numberOfAccounts.quantifier === 'exactly'))
	}

	const handleShare = async () => {
		browser.tabs
			.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					discriminator: 'success',
					items: {
						discriminator: 'authorizedRequest',
						auth: await login(selectedPersona, request.auth, interaction.metadata),
						oneTimePersonaData: await buildPersonaData(selectedPersona, request.oneTimePersonaData),
						ongoingPersonaData: await buildPersonaData(selectedPersona, request.ongoingPersonaData),
						oneTimeAccounts: await buildAccounts(selectedAccounts, request.oneTimeAccounts, interaction.metadata),
						ongoingAccounts: await buildAccounts(selectedAccounts, request.ongoingAccounts, interaction.metadata),
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
				{intl.formatMessage(messages.continue)}
			</Button>
		</Box>
	)
}
