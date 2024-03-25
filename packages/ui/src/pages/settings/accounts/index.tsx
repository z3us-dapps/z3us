import { DefaultDepositRule } from '@radixdlt/radix-engine-toolkit'
import { useQueryClient } from '@tanstack/react-query'
import type { CSSProperties } from 'react'
import React, { useEffect, useMemo, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { AccountCards } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Form } from 'ui/src/components/form'
import { SelectAdapter as AccountSelect } from 'ui/src/components/form/fields/account-select'
import { NftSelect } from 'ui/src/components/form/fields/nft-select'
import { Close2Icon } from 'ui/src/components/icons'
import { Input } from 'ui/src/components/input'
import { Radio, RadioGroup } from 'ui/src/components/radio-group'
import { SelectSimple } from 'ui/src/components/select'
import { Text } from 'ui/src/components/typography'
import { CARD_COLORS } from 'ui/src/constants/account'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useSendTransaction } from 'ui/src/hooks/use-send-transaction'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { AddressBookEntry } from 'ui/src/store/types'

import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'
import * as styles from './styles.css'

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
	account_skin: {
		id: 'MPmFMu',
		defaultMessage: 'Account skin',
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
	object_fit_cover: {
		id: '9pWpUc',
		defaultMessage: 'cover',
	},
	object_fit_contain: {
		id: 'uFMS8x',
		defaultMessage: 'contain',
	},
	object_fit_fill: {
		id: 'om4lTl',
		defaultMessage: 'fill',
	},
	account_skin_object_fit: {
		id: 'N2HbmZ',
		defaultMessage: 'Fit',
	},
	account_skin_opacity: {
		id: 'PHutSR',
		defaultMessage: 'Opacity',
	},
	clear_skin: {
		id: '/GCoTA',
		defaultMessage: 'Clear',
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

	const [currentRule, setRule] = useState<DefaultDepositRule>(DefaultDepositRule.Accept)
	const [selectedAccount, setSelectedAccount] = useState<AddressBookEntry | undefined>()

	const { data } = useEntityDetails(selectedAccount?.address)
	const { nonFungibleBalances = [] } = useBalances([selectedAccount?.address])

	const { setAddressBookEntry } = useNoneSharedStore(state => ({
		setAddressBookEntry: state.setAddressBookEntryAction,
	}))

	useEffect(() => {
		if (selectedAccount) return
		const accountsAsArray = Object.values(accounts)
		if (accountsAsArray.length > 0) {
			setSelectedAccount(accountsAsArray[0])
		}
	}, [accounts])

	useEffect(() => {
		const rule = (data?.details as any)?.state.default_deposit_rule
		if (!rule) return
		setRule(rule)
	}, [(data?.details as any)?.state.default_deposit_rule])

	const skinInitialValues = useMemo(
		() => ({
			address: selectedAccount?.skin?.collection || '',
			id: selectedAccount?.skin?.non_fungible_id || '',
		}),
		[selectedAccount?.skin?.collection, selectedAccount?.skin?.non_fungible_id],
	)

	const handleSelectAccount = (address: string) => {
		setSelectedAccount(Object.values(accounts).find(a => a.address === address))
	}

	const handleSkinSelect = (collection, non_fungible_id) => {
		if (!selectedAccount) return
		const entry = {
			...selectedAccount,
			skin: {
				collection,
				non_fungible_id,
				styles: {
					objectFit: selectedAccount.skin?.styles?.objectFit || 'cover',
					opacity: selectedAccount.skin?.styles?.opacity || '1',
				},
			},
		}
		setAddressBookEntry(networkId, selectedAccount.address, entry)
		setSelectedAccount(entry)
	}

	const handleClearSkin = () => {
		if (!selectedAccount) return
		const entry = {
			...selectedAccount,
			skin: undefined,
		}
		setAddressBookEntry(networkId, entry.address, entry)
		setSelectedAccount(entry)
	}

	const handleChangeSkinOpacity = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!selectedAccount) return
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) return
		selectedAccount.skin = {
			...selectedAccount.skin,
			styles: { ...(selectedAccount.skin?.styles || {}), opacity: event.target.value },
		}
		setAddressBookEntry(networkId, selectedAccount.address, selectedAccount)
		setSelectedAccount(selectedAccount)
	}

	const handleChangeSkinFit = (objectFit: CSSProperties['objectFit']) => {
		if (!selectedAccount) return
		selectedAccount.skin = { ...selectedAccount.skin, styles: { ...(selectedAccount.skin?.styles || {}), objectFit } }
		setAddressBookEntry(networkId, selectedAccount.address, selectedAccount)
		setSelectedAccount(selectedAccount)
	}

	const handleSelectColor = (value: string) => {
		if (!selectedAccount) return
		const entry = { ...selectedAccount, cardColor: value }
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
		setRule(newRule)

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
						<Box className={styles.accountsCardWrapper}>
							<AccountCards accounts={selectedAccount ? [selectedAccount] : []} />
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
							<Box className={styles.skinSelectWrapper}>
								<Text size="small" weight="medium" color="strong">
									{intl.formatMessage(messages.account_skin)}
								</Text>
								<Box className={styles.skinClearButtonWrapper}>
									<Button
										sizeVariant="small"
										styleVariant="secondary"
										onClick={handleClearSkin}
										leftIcon={<Close2Icon />}
									>
										{intl.formatMessage(messages.clear_skin)}
									</Button>
								</Box>
							</Box>
							{nonFungibleBalances.length > 0 && (
								<Form initialValues={skinInitialValues}>
									<NftSelect fromAccount={selectedAccount?.address} onSelect={handleSkinSelect} />
									{selectedAccount?.skin?.collection && selectedAccount?.skin?.non_fungible_id && (
										<>
											<Box display="flex" flexDirection="column" gap="small" marginTop="small">
												<Text size="small" weight="medium" color="strong">
													{intl.formatMessage(messages.account_skin_object_fit)}
												</Text>
												<SelectSimple
													value={selectedAccount?.skin?.styles?.objectFit}
													dropDownWidth={150}
													onValueChange={handleChangeSkinFit}
													data={[
														{ id: 'cover', title: intl.formatMessage(messages.object_fit_cover) },
														{ id: 'contain', title: intl.formatMessage(messages.object_fit_contain) },
														{ id: 'fill', title: intl.formatMessage(messages.object_fit_fill) },
													]}
												/>
											</Box>
											<Box display="flex" flexDirection="column" gap="small" marginTop="small">
												<Text size="small" weight="medium" color="strong">
													{intl.formatMessage(messages.account_skin_opacity)}
												</Text>
												<Input
													value={selectedAccount?.skin?.styles?.opacity}
													type="range"
													min="0"
													max="1"
													step="0.1"
													onChange={handleChangeSkinOpacity}
												/>
											</Box>
										</>
									)}
								</Form>
							)}
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								{intl.formatMessage(messages.third_party_deposits)}
							</Text>

							<Box display="flex" gap="small" flexDirection="column" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								<RadioGroup
									value={currentRule}
									aria-label="update account deposits"
									onValueChange={handleThirdPartyDeposits}
								>
									<Box display="flex" flexDirection="column" gap="medium">
										<Radio value={DefaultDepositRule.Accept} id={DefaultDepositRule.Accept}>
											<Box width="full" height="full" borderRadius="full">
												<Text size="small" weight="medium" color="strong">
													{intl.formatMessage(messages.third_party_deposits_accept_all_title)}
												</Text>
												<Text size="xxsmall">
													{intl.formatMessage(messages.third_party_deposits_accept_all_description)}
												</Text>
											</Box>
										</Radio>
										<Radio value={DefaultDepositRule.AllowExisting} id={DefaultDepositRule.AllowExisting}>
											<Box width="full" height="full" borderRadius="full">
												<Text size="small" weight="medium" color="strong">
													{intl.formatMessage(messages.third_party_deposits_accept_known_title)}
												</Text>
												<Text size="xxsmall">
													{intl.formatMessage(messages.third_party_deposits_accept_known_description)}
												</Text>
											</Box>
										</Radio>
										<Radio value={DefaultDepositRule.Reject} id={DefaultDepositRule.Reject}>
											<Box width="full" height="full" borderRadius="full">
												<Text size="small" weight="medium" color="strong">
													{intl.formatMessage(messages.third_party_deposits_deny_all_title)}
												</Text>
												<Text size="xxsmall">
													{intl.formatMessage(messages.third_party_deposits_deny_all_description)}
												</Text>
											</Box>
										</Radio>
									</Box>
								</RadioGroup>
							</Box>
							<Box>
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
