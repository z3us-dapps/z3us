import { CARD_COLORS, CARD_IMAGES } from 'packages/ui/src/constants/account'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import type { AddressBookEntry } from 'packages/ui/src/store/types'
import React, { useEffect, useState } from 'react'

import { AccountCards } from 'ui/src/components/account-cards'
import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { AccountDropdown } from 'ui/src/containers/accounts/account-dropdown'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'
import * as accountsStyles from './styles.css'

const Accounts: React.FC = () => {
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

	return (
		<SettingsWrapper>
			<SettingsTitle
				backLink="/settings"
				title={<Translation capitalizeFirstLetter text="settings.navigation.accountsTitle" />}
				subTitle={<Translation capitalizeFirstLetter text="settings.navigation.accountsSubTitle" />}
			/>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.accounts.accountTitle" />
						</Text>
						<Text size="small">
							<Translation capitalizeFirstLetter text="settings.accounts.accountSubTitle" />
						</Text>
					</>
				}
				rightCol={
					<Box display="flex" flexDirection="column" gap="xlarge">
						<AccountDropdown
							account={selectedAccount?.address}
							knownAddresses={accounts}
							onUpdateAccount={handleSelectAccount}
							accounts={accountsAsArray.map(account => ({ id: account.address, title: account.name }))}
							styleVariant="tertiary"
						/>
						<Box className={accountsStyles.accountsCardWrapper}>
							<AccountCards
								accounts={accountsAsArray}
								selectedCardIndex={accountsAsArray.findIndex(a => a.address === selectedAccount?.address)}
								isCardShadowVisible={false}
							/>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								<Translation capitalizeFirstLetter text="settings.accounts.accountColor" />
							</Text>
							<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								{CARD_COLORS.map(a => (
									<Button
										key={a}
										active={a === selectedAccount?.cardColor}
										rounded
										styleVariant="avatar"
										sizeVariant="small"
										iconOnly
										onClick={() => handleSelectColor(a)}
									>
										<Box width="full" height="full" borderRadius="full" style={{ background: a }} />
									</Button>
								))}
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								<Translation capitalizeFirstLetter text="settings.accounts.accountImage" />
							</Text>
							<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								{CARD_IMAGES.map(a => (
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
											src={`/images/account-images/${a}`}
											alt="img"
											fallback="df"
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
