import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type {
	WalletAuthorizedRequestItems,
	WalletAuthorizedRequestResponseItems,
	WalletUnauthorizedRequestItems,
} from '@radixdlt/radix-dapp-toolkit'
import { useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { ApprovedDapps, Personas } from 'ui/src/store/types'
import { getShortAddress } from 'ui/src/utils/string-utils'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { useAccountsData } from '@src/hooks/interaction/use-accounts-data'
import { useLogin } from '@src/hooks/interaction/use-login'
import { usePersonaDataModal } from '@src/hooks/modal/use-persona-data-modal'
import { useSelectAccountsModal } from '@src/hooks/modal/use-select-accounts-modal'
import { useSelectPersonaModal } from '@src/hooks/modal/use-select-persona-modal'

import * as styles from './styles.css'

const messages = defineMessages({
	continue: {
		id: 'acrOoz',
		defaultMessage: 'Continue',
	},
	new_login_request_title: {
		id: '2YVSp1',
		defaultMessage: 'New login request',
	},
	new_login_request_sub_title: {
		id: '8iQPpT',
		defaultMessage: 'It is required that you login for the first time with a persona.',
	},
	select_persona: {
		id: 'hlCux0',
		defaultMessage: `{isSelected, select,
			false {Select persona}
			other {{displayName}}
		}`,
	},
	select_accounts: {
		id: 'kK8Tp3',
		defaultMessage: `{isSelected, select,
			false {Select accounts}
			other {{accountsList}}
		}`,
	},
	error: {
		id: '2KvtzK',
		defaultMessage: `Failed to login {hasMessage, select,
			true {: {message}}
			other {, please try again}
		}`,
	},
	select_persona_title: {
		defaultMessage: 'Select persona',
		id: 'yEEu6R',
	},
	select_accounts_title: {
		defaultMessage: 'Select accounts',
		id: 'Zk+6UC',
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
	const addressBook = useAddressBook()

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

	const persona = useMemo(() => personaIndexes[selectedPersona], [personaIndexes, selectedPersona])

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
					walletResponse: {
						discriminator: 'success',
						items: response,
						interactionId,
						metadata: interaction.metadata,
					},
					metadata: interaction.metadata,
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
					walletResponse: {
						discriminator: 'failure',
						error: intl.formatMessage(messages.error, { hasMessage: !!error?.message, message: error?.message }),
						interactionId,
					},
					metadata: interaction.metadata,
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
		<Box className={styles.interactionLoginWrapper}>
			<Box className={styles.interactionLoginBodyWrapper}>
				<Box className={styles.interactionLoginBodyTextWrapper}>
					<Text color="strong" size="xlarge" weight="strong">
						{intl.formatMessage(messages.new_login_request_title)}
					</Text>
					<Text>{intl.formatMessage(messages.new_login_request_sub_title)}</Text>
				</Box>
				<Box className={styles.interactionLoginBodyButtonWrapper}>
					<Text color="strong" size="small" weight="strong">
						{intl.formatMessage(messages.select_persona_title)}
					</Text>
					<Button
						onClick={handleSelectPersona}
						styleVariant="tertiary"
						sizeVariant="xlarge"
						fullWidth
						disabled={interaction.items.auth.discriminator === 'usePersona'}
					>
						{intl.formatMessage(messages.select_persona, {
							isSelected: !!persona,
							displayName: persona?.label || getShortAddress(persona?.identityAddress),
						})}
					</Button>
				</Box>
				{canSelectAccounts && (
					<Box className={styles.interactionLoginBodyButtonWrapper}>
						<Text color="strong" size="small" weight="strong">
							{intl.formatMessage(messages.select_accounts_title)}
						</Text>
						<Button
							onClick={handleSelectAccounts}
							styleVariant="tertiary"
							sizeVariant="xlarge"
							fullWidth
							disabled={!personaIndexes[selectedPersona]}
						>
							{intl.formatMessage(messages.select_accounts, {
								isSelected: selectedAccounts.length > 0,
								accountsList: intl.formatList(
									selectedAccounts.map(acc => addressBook[acc]?.name || getShortAddress(acc)),
									{ type: 'conjunction' },
								),
							})}
						</Button>
					</Box>
				)}

				{/* {Array.from({ length: 100 }, (_, i) => (
					<Text size="xlarge" key={i}>
						right
					</Text>
				))} */}
			</Box>
			<Box className={styles.interactionLoginFooterWrapper}>
				<Button
					onClick={handleShare}
					styleVariant="primary"
					sizeVariant="xlarge"
					fullWidth
					disabled={canSelectAccounts && selectedAccounts.length === 0}
				>
					{intl.formatMessage(messages.continue)}
				</Button>
			</Box>
		</Box>
	)
}
