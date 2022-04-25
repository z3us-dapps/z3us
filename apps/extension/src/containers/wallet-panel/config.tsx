import React from 'react'
import { AccountsIcon, StakingIcon, SettingsIcon } from 'ui/src/components/icons'

export const APP_HEIGHT = 600
export const APP_WIDTH = 360
export const PANEL_HEIGHT = '552px'

export const EXPLORER_URL = 'https://explorer.radixdlt.com/#'

export const ACCOUNTS = 'accounts'
export const NFT = 'nft'
export const SWAP = 'swap'
export const STAKING = 'staking'
export const SETTINGS = 'settings'

export const routesInfo = {
	[ACCOUNTS]: {
		id: ACCOUNTS,
		name: 'Accounts',
		icon: <AccountsIcon />,
		bgColor: ['#f0f0f0', '#323337'],
		href: 'account',
	},
	[STAKING]: {
		id: STAKING,
		name: 'Staking',
		icon: <StakingIcon />,
		bgColor: ['#ffffff', '#161718'],
		href: 'staking',
	},
	[SETTINGS]: {
		id: SETTINGS,
		name: 'Settings',
		icon: <SettingsIcon />,
		bgColor: ['#ffffff', '#161718'],
		href: 'settings',
	},
}
