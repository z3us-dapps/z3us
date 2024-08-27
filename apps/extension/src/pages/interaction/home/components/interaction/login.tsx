import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type {
	WalletAuthorizedRequestItems,
	WalletAuthorizedRequestResponseItems,
	WalletUnauthorizedRequestItems,
	WalletUnauthorizedRequestResponseItems,
} from '@radixdlt/radix-dapp-toolkit'
import { useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { UserCheck, WalletIcon } from 'ui/src/components/icons'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { useAddressBookWithAccounts } from 'ui/src/hooks/use-address-book'
import { useApprovedDapps } from 'ui/src/hooks/use-approved-dapps'
import { usePersonaIndexes } from 'ui/src/hooks/use-persona-indexes'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { ApprovedDapps, Personas } from 'ui/src/store/types'
import { getShortAddress } from 'ui/src/utils/string'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { usePersonaDataModal } from '@src/hooks/modal/use-persona-data-modal'
import { useSelectAccountsModal } from '@src/hooks/modal/use-select-accounts-modal'
import { useSelectPersonaModal } from '@src/hooks/modal/use-select-persona-modal'
import { useAccountsData } from '@src/networks/radix/hooks/interaction/use-accounts-data'
import { useLogin } from '@src/networks/radix/hooks/interaction/use-login'
import { sendInteractionMessage } from '@src/networks/radix/interaction'

import { DappDetails } from '../dapp-details'
import { NetworkAlert } from '../network-alert'
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
	const addressBook = useAddressBookWithAccounts()
	const accountIndexes = useAccountIndexes()
	const personaIndexes = usePersonaIndexes()
	const approvedDapps = useApprovedDapps()

	const login = useLogin()
	const buildAccounts = useAccountsData()

	const { approveDapp } = useNoneSharedStore(state => ({
		approveDapp: state.approveDappAction,
	}))

	const request = interaction.items as WalletAuthorizedRequestItems //| WalletUnauthorizedRequestItems
	const canSelectAccounts = request.ongoingAccounts || request.oneTimeAccounts

	const [selectedPersona, setSelectedPersona] = useState<string>(
		getInitialPersona(interaction.metadata.dAppDefinitionAddress, approvedDapps, personaIndexes, request),
	)
	const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

	useEffect(() => {
		const { accounts = [] } = approvedDapps[interaction.metadata.dAppDefinitionAddress] || {}
		accounts.filter(address => !!accountIndexes[address]).map(_address => ({ address: _address }))
		setSelectedAccounts(accounts.filter(address => !!accountIndexes[address]))
	}, [accountIndexes, approvedDapps])

	const persona = useMemo(() => personaIndexes[selectedPersona], [personaIndexes, selectedPersona])
	const accountsList = useMemo(
		() => selectedAccounts.map(acc => addressBook[acc]?.name || getShortAddress(acc)),
		[selectedAccounts, addressBook],
	)

	const handleSelectPersona = async () => {
		setSelectedPersona(await selectPersona())
	}

	const handleSelectAccounts = async () => {
		const { numberOfAccounts } = request.ongoingAccounts || request.oneTimeAccounts || {}
		setSelectedAccounts(
			await selectAccounts(numberOfAccounts?.quantity || 1, numberOfAccounts?.quantifier === 'exactly', interaction),
		)
	}

	const handleShare = async () => {
		try {
			const response: WalletAuthorizedRequestResponseItems | WalletUnauthorizedRequestResponseItems = {
				discriminator: request.discriminator,
				auth: await login(selectedPersona, request.auth, interaction.metadata),
				oneTimePersonaData: await getPersonaData(selectedPersona, request.oneTimePersonaData),
				ongoingPersonaData: await getPersonaData(selectedPersona, request.ongoingPersonaData),
				oneTimeAccounts: await buildAccounts(selectedAccounts, request.oneTimeAccounts, interaction.metadata),
				ongoingAccounts: await buildAccounts(selectedAccounts, request.ongoingAccounts, interaction.metadata),
			}
			await sendInteractionMessage(
				interaction,
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
			if (request.discriminator === 'authorizedRequest') {
				approveDapp(
					networkId,
					interaction.metadata.dAppDefinitionAddress,
					response.auth?.persona?.identityAddress || '',
					response.ongoingAccounts?.accounts.map(({ address }) => address) || [],
				)
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			sendInteractionMessage(
				interaction,
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

	return (
		<>
			<ScrollArea className={styles.interactionScrollWrapper}>
				<Box className={styles.interactionLoginBodyWrapper}>
					<DappDetails {...interaction?.metadata} />
					<NetworkAlert {...interaction?.metadata} />
					<Box className={styles.interactionLoginBodyTextWrapper}>
						<Text color="strong" size="large" weight="strong">
							{intl.formatMessage(messages.new_login_request_title)}
						</Text>
						<Text size="small">{intl.formatMessage(messages.new_login_request_sub_title)}</Text>
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
							disabled={request.auth?.discriminator === 'usePersona'}
							leftIcon={<UserCheck />}
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
								leftIcon={<WalletIcon />}
							>
								{intl.formatMessage(messages.select_accounts, {
									isSelected: selectedAccounts.length > 0,
									accountsList: intl.formatList(accountsList, { type: 'conjunction' }),
								})}
							</Button>
						</Box>
					)}
				</Box>
			</ScrollArea>
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
		</>
	)
}
