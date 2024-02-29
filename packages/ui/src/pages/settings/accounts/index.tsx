import { DefaultDepositRule } from '@radixdlt/radix-engine-toolkit'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { AccountCards } from 'ui/src/components/account-cards'
import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { SelectAdapter as AccountSelect } from 'ui/src/components/form/fields/account-select'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'
import { CARD_COLORS, CARD_IMAGES } from 'ui/src/constants/account'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { AddressBookEntry } from 'ui/src/store/types'

import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'
import * as accountsStyles from './styles.css'

const messages = defineMessages({
	title: {
		id: 'FvanT6',
		defaultMessage: 'Accounts',
	},
	subtitle: {
		id: 'PVFF5y',
		defaultMessage: `Customize your Radix account's look and feel. Personalize your experience by choosing a unique background image and color scheme that suits your style`,
	},
	account_title: {
		id: 'TwyMau',
		defaultMessage: 'Account',
	},
	account_subtitle: {
		id: 'n1cwSp',
		defaultMessage: 'Adjust color and background image for the account card',
	},
	account_label: {
		id: 'lmrABY',
		defaultMessage: 'Account label',
	},
	account_color: {
		id: 'zXIZtJ',
		defaultMessage: 'Account color',
	},
	account_image: {
		id: 'yWx/0A',
		defaultMessage: 'Account image',
	},
	third_party_deposits: {
		id: '93MRNX',
		defaultMessage: 'Third party deposits',
	},
	third_party_deposits_accept_all_title: {
		id: 'wLLWDX',
		defaultMessage: 'Accept all deposits',
	},
	third_party_deposits_accept_all_description: {
		id: 'z0CNtW',
		defaultMessage: 'Allow third-parties to deposit any asset',
	},
	third_party_deposits_accept_known_title: {
		id: 'deE3OR',
		defaultMessage: 'Only accept known',
	},
	third_party_deposits_accept_known_description: {
		id: '4jkBhr',
		defaultMessage: 'Allow third-parties to deposit only assets this Account already holds',
	},
	third_party_deposits_deny_all_title: {
		id: 'yc2VjA',
		defaultMessage: 'Deny all',
	},
	third_party_deposits_deny_all_description: {
		id: 'zlB8/W',
		defaultMessage: 'Deny all third-party deposits',
	},
	third_party_deposits_deny_all_warning: {
		id: 'RuLRPQ',
		defaultMessage:
			'This account will not be able to receive "air drops" or be used by a trusted contact to assist with account recovery.',
	},
	error_toast: {
		id: 'fjqZcw',
		defaultMessage: 'Failed submitting transaction to the network',
	},
	success_toast: {
		id: 'Gkt0d0',
		defaultMessage: 'Successfully submitted transaction to the network',
	},
	toast_action_label: {
		id: 'K7AkdL',
		defaultMessage: 'Show',
	},
})

const Accounts: React.FC = () => {
	const intl = useIntl()
	const queryClient = useQueryClient()
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const networkId = useNetworkId()
	const accounts = useWalletAccounts()
	const sendTransaction = useSendTransaction()
	const accountsAsArray = Object.values(accounts)

	const [currentRule, setRule] = useState<DefaultDepositRule | undefined>()
	const [selectedAccount, setSelectedAccount] = useState<AddressBookEntry | undefined>()

	const { data } = useEntityDetails(selectedAccount?.address)

	const { setAddressBookEntry } = useNoneSharedStore(state => ({
		setAddressBookEntry: state.setAddressBookEntryAction,
	}))

	useEffect(() => {
		if (selectedAccount) return
		if (accountsAsArray.length > 0) {
			setSelectedAccount(accountsAsArray[0])
		}
	}, [accounts])

	useEffect(() => {
		const rule = (data?.details as any)?.state.default_deposit_rule
		if (!rule) return
		setRule(rule)
	}, [(data?.details as any)?.state.default_deposit_rule])

	const handleSelectAccount = (address: string) => {
		setSelectedAccount(accountsAsArray.find(a => a.address === address))
	}

	const handleSelectColor = (value: string) => {
		if (!selectedAccount) return
		const entry = { ...selectedAccount, cardColor: value }
		setAddressBookEntry(networkId, selectedAccount.address, entry)
		setSelectedAccount(entry)
	}

	const handleSelectCard = (value: string) => {
		if (!selectedAccount) return
		const entry = { ...selectedAccount, cardImage: value }
		setAddressBookEntry(networkId, selectedAccount.address, entry)
		setSelectedAccount(entry)
	}

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!selectedAccount) return
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}
		const entry = { ...selectedAccount, name: event.target.value }
		setAddressBookEntry(networkId, selectedAccount.address, entry)
		setSelectedAccount(entry)
	}

	// https://github.com/radixdlt/radixdlt-scrypto/blob/develop/transaction/examples/account/deposit_modes.rtm
	const handleThirdPartyDeposits = async (newRule: DefaultDepositRule) => {
		setRule(undefined)

		await sendTransaction({
			version: 1,
			transactionManifest: `
			CALL_METHOD 
				Address("${data.address}") 
				"set_default_deposit_rule" 
				Enum<DefaultDepositRule::${newRule}>();
		`,
		})
			.then(value => {
				setRule(newRule)
				queryClient.invalidateQueries({ queryKey: ['useEntitiesDetails', networkId, [data.address]] })
				toast.success(intl.formatMessage(messages.success_toast), {
					description: value.status,
					action: {
						label: intl.formatMessage(messages.toast_action_label),
						onClick: () => {
							searchParams.set('tx', `${value.transactionIntentHash}`)
							navigate(`${location.pathname}?${searchParams}`)
						},
					},
				})
			})
			.catch(error => {
				setRule((data?.details as any)?.state.default_deposit_rule)
				toast.error(intl.formatMessage(messages.error_toast), {
					description: error.message || error.error,
				})
			})
	}

	return (
		<SettingsWrapper>
			<SettingsTitle title={intl.formatMessage(messages.title)} subTitle={intl.formatMessage(messages.subtitle)} />
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.account_title)}
						</Text>
						<Box paddingRight="small">
							<Text size="small">{intl.formatMessage(messages.account_subtitle)}</Text>
						</Box>
					</>
				}
				rightCol={
					<Box display="flex" flexDirection="column" gap="large">
						<AccountSelect value={selectedAccount?.address} onChange={handleSelectAccount} />
						<Box className={accountsStyles.accountsCardWrapper}>
							<AccountCards
								accounts={accountsAsArray}
								selectedCardIndex={accountsAsArray.findIndex(a => a.address === selectedAccount?.address)}
								isCardShadowVisible={false}
							/>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								{intl.formatMessage(messages.account_label)}
							</Text>
							<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								<Input value={selectedAccount?.name} onChange={handleChangeName} />
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								{intl.formatMessage(messages.account_color)}
							</Text>
							<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								{Object.entries(CARD_COLORS).map(([a, color]) => (
									<Button
										key={a}
										active={a === selectedAccount?.cardColor}
										rounded
										styleVariant="avatar"
										sizeVariant="small"
										iconOnly
										onClick={() => handleSelectColor(a)}
									>
										<Box width="full" height="full" borderRadius="full" style={{ background: color }} />
									</Button>
								))}
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								{intl.formatMessage(messages.account_image)}
							</Text>
							<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								{Object.entries(CARD_IMAGES).map(([a, image]) => (
									<Button
										key={a}
										active={a === selectedAccount?.cardImage}
										styleVariant="avatar"
										sizeVariant="medium"
										iconOnly
										onClick={() => handleSelectCard(a)}
									>
										<Avatar
											styleVariant="square"
											sizeVariant="medium"
											src={`/images/account-images/${image}`}
											alt="img"
											fallback="card image"
											className={accountsStyles.accountsAvatarImgWrapper}
										/>
									</Button>
								))}
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								{intl.formatMessage(messages.third_party_deposits)}
							</Text>
							<Box display="flex" gap="small" flexDirection="column" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								<Button
									active={currentRule === DefaultDepositRule.Accept}
									onClick={() => handleThirdPartyDeposits(DefaultDepositRule.Accept)}
									disabled={!currentRule}
									styleVariant="avatar"
									sizeVariant="medium"
								>
									<Box width="full" height="full" borderRadius="full">
										<Text size="small" weight="medium" color="strong">
											{intl.formatMessage(messages.third_party_deposits_accept_all_title)}
										</Text>
										<Text size="xxsmall">
											{intl.formatMessage(messages.third_party_deposits_accept_all_description)}
										</Text>
									</Box>
								</Button>
								<Button
									active={currentRule === DefaultDepositRule.AllowExisting}
									onClick={() => handleThirdPartyDeposits(DefaultDepositRule.AllowExisting)}
									disabled={!currentRule}
									styleVariant="avatar"
									sizeVariant="medium"
								>
									<Box width="full" height="full" borderRadius="full">
										<Text size="small" weight="medium" color="strong">
											{intl.formatMessage(messages.third_party_deposits_accept_known_title)}
										</Text>
										<Text size="xxsmall">
											{intl.formatMessage(messages.third_party_deposits_accept_known_description)}
										</Text>
									</Box>
								</Button>
								<Button
									active={currentRule === DefaultDepositRule.Reject}
									onClick={() => handleThirdPartyDeposits(DefaultDepositRule.Reject)}
									disabled={!currentRule}
									styleVariant="avatar"
									sizeVariant="medium"
								>
									<Box width="full" height="full" borderRadius="full">
										<Text size="small" weight="medium" color="strong">
											{intl.formatMessage(messages.third_party_deposits_deny_all_title)}
										</Text>
										<Text size="xxsmall">{intl.formatMessage(messages.third_party_deposits_deny_all_description)}</Text>
									</Box>
								</Button>
								{currentRule === DefaultDepositRule.Reject && (
									<Text size="xxsmall" color="red">
										{intl.formatMessage(messages.third_party_deposits_deny_all_warning)}
									</Text>
								)}
							</Box>
						</Box>
					</Box>
				}
			/>
		</SettingsWrapper>
	)
}

export default Accounts
