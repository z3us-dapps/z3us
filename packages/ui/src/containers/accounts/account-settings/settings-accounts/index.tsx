import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import React, { useState } from 'react'

import { AccountCards } from 'ui/src/components/account-cards'
import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { AccountDropdown } from 'ui/src/containers/accounts/account-dropdown'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useWalletAccounts } from 'ui/src/hooks/use-wallet-account'

import * as styles from '../account-settings.css'
import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import * as accountsStyles from './settings-accounts.css'

const CARD_COLORS = [
	'radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)',
	'radial-gradient(77.21% 96.45% at 50% 100%, #C0D7EF 0%, #C0D7EF 17.71%, #C0D7EF 50.52%, #C0D7EF 100%)',
	'radial-gradient(77.21% 96.45% at 50% 100%, #BF9E76 0%, #BF9E76 17.71%, #BF9E76 50.52%, #BF9E76 100%)',
]

const CARD_IMAGES = ['z3us-apple-hermes.png', 'z3us-athens.png', 'z3us-apple-hermes-v2.png']

export const SettingsAccounts: React.FC = () => {
	const networkId = useNetworkId()
	const accounts = useWalletAccounts()
	const { selectedAccount, selectAccount, addressBook } = useNoneSharedStore(state => ({
		selectedAccount: state.selectedAccount,
		selectAccount: state.selectAccountAction,
		addressBook: state.addressBook[networkId] || {},
	}))
	const knownAddresses = { ...accounts, ...addressBook }
	const accountsAsArray = Object.values(accounts)

	const [cardColor, setCardColor] = useState<number>(0)
	const [cardImage, setCardImage] = useState<number>(0)

	const cards = [
		{
			accountId: 'rdx1b7073886',
			accountName: 'Spend',
			accountBalance: '$1043.43',
			backgroundImage: `url(/images/account-images/${CARD_IMAGES[cardImage]}), ${CARD_COLORS[cardColor]}`,
		},
	]

	return (
		<Box className={styles.settingsSectionFlexColumnWrapper}>
			<SettingsTitle
				title={<Translation capitalizeFirstLetter text="settings.navigation.accountsTitle" />}
				subTitle={<Translation capitalizeFirstLetter text="settings.navigation.accountsSubTitle" />}
			/>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<Text size="large" weight="strong" color="strong">
						Account
					</Text>
				}
				rightCol={
					<Box display="flex" flexDirection="column" gap="xlarge">
						<AccountDropdown
							account={selectedAccount}
							knownAddresses={knownAddresses}
							onUpdateAccount={selectAccount}
							accounts={accountsAsArray.map(account => ({ id: account.address, title: account.name }))}
							styleVariant="tertiary"
						/>
						<Box className={accountsStyles.accountsCardWrapper}>
							<AccountCards accountCards={cards} selectedCardIndex={0} isCardShadowVisible={false} />
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								<Translation capitalizeFirstLetter text="settings.accounts.colorTitle" />
							</Text>
							<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								{accountsAsArray.map((a, i) => (
									<Button
										key={a.address}
										active={i === cardColor}
										rounded
										styleVariant="avatar"
										sizeVariant="small"
										iconOnly
										onClick={() => setCardColor(i)}
									>
										<Box width="full" height="full" borderRadius="full" style={{ background: CARD_COLORS[i] }} />
									</Button>
								))}
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								<Translation capitalizeFirstLetter text="settings.accounts.accountImageTitle" />
							</Text>
							<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								{accountsAsArray.map((a, i) => (
									<Button
										key={a.address}
										active={i === cardImage}
										styleVariant="avatar"
										sizeVariant="medium"
										iconOnly
										onClick={() => setCardImage(i)}
									>
										<Avatar
											styleVariant="square"
											sizeVariant="medium"
											// src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
											src={`/images/account-images/${CARD_IMAGES[i]}`}
											alt="this is the image"
											fallback="df"
										/>
									</Button>
								))}
							</Box>
						</Box>
					</Box>
				}
			/>
			<Box>
				<Text size="large">
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
					Consequat veniam eiusmod ad officia aliqua eiusmod sit exercitation cupidatat voluptate anim dolore laborum.
				</Text>
			</Box>
		</Box>
	)
}
