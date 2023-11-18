import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { AccountCards } from 'ui/src/components/account-cards'
import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { SelectAdapter as AccountSelect } from 'ui/src/components/form/fields/account-select'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'
import { CARD_COLORS, CARD_IMAGES } from 'ui/src/constants/account'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
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
})

const Accounts: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const accounts = useWalletAccounts()
	const accountsAsArray = Object.values(accounts)
	const [selectedAccount, setSelectedAccount] = useState<AddressBookEntry | undefined>()
	const { setAddressBookEntry } = useNoneSharedStore(state => ({
		setAddressBookEntry: state.setAddressBookEntryAction,
	}))

	useEffect(() => {
		if (selectedAccount) return
		if (accountsAsArray.length > 0) {
			setSelectedAccount(accountsAsArray[0])
		}
	}, [accounts])

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
					</Box>
				}
			/>
		</SettingsWrapper>
	)
}

export default Accounts
