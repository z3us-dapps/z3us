import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type {
	WalletAuthorizedRequestItems,
	WalletAuthorizedRequestResponseItems,
	WalletUnauthorizedRequestItems,
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
import type { ApprovedDapps, Personas } from 'ui/src/store/types'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { useAccountsData } from '@src/hooks/interaction/use-accounts-data'
import { useLogin } from '@src/hooks/interaction/use-login'
import { usePersonaDataModal } from '@src/hooks/modal/use-persona-data-modal'
import { useSelectAccountsModal } from '@src/hooks/modal/use-select-accounts-modal'
import { useSelectPersonaModal } from '@src/hooks/modal/use-select-persona-modal'

const messages = defineMessages({
	continue: {
		id: 'acrOoz',
		defaultMessage: 'Continue',
	},
	select_persona: {
		id: 'yEEu6R',
		defaultMessage: 'Select persona',
	},
	select_accounts: {
		id: 'Zk+6UC',
		defaultMessage: 'Select accounts',
	},
	error: {
		id: '2KvtzK',
		defaultMessage: `Failed to login {hasMessage, select,
			true {: {message}}
			other {, please try again}
		}`,
	},
})

function getInitialPersona(
	dappAddress: string,
	approvedDapps: ApprovedDapps,
	personas: Personas,
	request: WalletAuthorizedRequestItems | WalletUnauthorizedRequestItems,
): string {
	if (request.discriminator === 'authorizedRequest' && request.auth.discriminator === 'usePersona') {
		const { identityAddress } = request.auth
		return Object.keys(personas).find(address => address === identityAddress)
	}
	const { persona = '' } = approvedDapps[dappAddress] || {}
	return persona
}

function getInitialAccounts(dappAddress: string, approvedDapps: ApprovedDapps): string[] {
	const { accounts = [] } = approvedDapps[dappAddress] || {}
	return accounts
}

interface IProps {
	interaction: WalletInteractionWithTabId
}

export const LoginRequest: React.FC<IProps> = ({ interaction }) => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const networkId = useNetworkId()
	const selectPersona = useSelectPersonaModal()
	const selectAccounts = useSelectAccountsModal()
	const getPersonaData = usePersonaDataModal()

	const login = useLogin()
	const buildAccounts = useAccountsData()

	const { approvedDapps, personaIndexes, approveDapp } = useNoneSharedStore(state => ({
		approvedDapps: state.approvedDapps[networkId] || {},
		personaIndexes: state.personaIndexes[networkId] || {},
		approveDapp: state.approveDappAction,
	}))

	const request = interaction.items as WalletAuthorizedRequestItems //| WalletUnauthorizedRequestItems
	const canSelectAccounts = request.ongoingAccounts || request.oneTimeAccounts

	const [selectedPersona, setSelectedPersona] = useState<string>(
		getInitialPersona(interaction.metadata.dAppDefinitionAddress, approvedDapps, personaIndexes, request),
	)
	const [selectedAccounts, setSelectedAccounts] = useState<string[]>(
		getInitialAccounts(interaction.metadata.dAppDefinitionAddress, approvedDapps),
	)

	const handleSelectPersona = async () => {
		setSelectedPersona(await selectPersona())
	}

	const handleSelectAccounts = async () => {
		const { numberOfAccounts } = request.ongoingAccounts || request.oneTimeAccounts || {}
		setSelectedAccounts(
			await selectAccounts(numberOfAccounts?.quantity || 1, numberOfAccounts?.quantifier === 'exactly'),
		)
	}

	const handleShare = async () => {
		try {
			const response: WalletAuthorizedRequestResponseItems = {
				discriminator: 'authorizedRequest',
				auth: await login(selectedPersona, request.auth, interaction.metadata),
				oneTimePersonaData: await getPersonaData(selectedPersona, request.oneTimePersonaData),
				ongoingPersonaData: await getPersonaData(selectedPersona, request.ongoingPersonaData),
				oneTimeAccounts: await buildAccounts(selectedAccounts, request.oneTimeAccounts, interaction.metadata),
				ongoingAccounts: await buildAccounts(selectedAccounts, request.ongoingAccounts, interaction.metadata),
			}
			await browser.tabs.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					discriminator: 'success',
					items: response,
					interactionId,
				}),
			)
			if (response.auth?.persona?.identityAddress && response.ongoingAccounts?.accounts?.length > 0) {
				approveDapp(
					networkId,
					interaction.metadata.dAppDefinitionAddress,
					response.auth.persona.identityAddress,
					response.ongoingAccounts.accounts.map(({ address }) => address),
				)
			}
		} catch (error) {
			browser.tabs.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					discriminator: 'failure',
					interactionId,
					error: intl.formatMessage(messages.error, { hasMessage: !!error?.message, message: error?.message }),
				}),
			)
		} finally {
			window.close()
		}
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
			{canSelectAccounts && (
				<Button
					onClick={handleSelectAccounts}
					styleVariant="tertiary"
					sizeVariant="xlarge"
					fullWidth
					disabled={!personaIndexes[selectedPersona]}
				>
					{intl.formatMessage(messages.select_accounts)}
				</Button>
			)}
			<Button
				onClick={handleShare}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				disabled={canSelectAccounts && selectedAccounts.length === 0}
			>
				{intl.formatMessage(messages.continue)}
			</Button>
		</Box>
	)
}
