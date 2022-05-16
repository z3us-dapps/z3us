import React from 'react'
import { AccountsIcon, StakingIcon, SettingsIcon } from 'ui/src/components/icons'
import { ColorSettings } from '@src/types'

export const defaultToken = { order: Number.MAX_SAFE_INTEGER }

export const defaultTokenSettings = {
	xrd: { image: 'images/token-images/xrd.png', order: 0 },
	oci: { image: 'images/token-images/oci.png', order: 1 },
	dgc: { image: 'images/token-images/dgc.png', order: 2 },
}

export const PRESET_COLOR_HELIOTROPE_SUNRISE = 'preset_color_heliotrope_sunrise'
export const PRESET_COLOR_PIGEON_POST = 'preset_color_pigeon_post'
export const PRESET_COLOR_KOBI = 'preset_color_pigeon_kobi'

export const presetMap = {
	[PRESET_COLOR_HELIOTROPE_SUNRISE]: {
		[ColorSettings.COLOR_PRIMARY]: '#FE845E',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#E08BAB',
		[ColorSettings.COLOR_SECONDARY_STOP]: '18',
		[ColorSettings.COLOR_TERTIARY]: '#946DFF',
		[ColorSettings.COLOR_TERTIARY_STOP]: '60',
		[ColorSettings.COLOR_TEXT]: '#0e0324',
		[ColorSettings.COLOR_BORDER]: '#d9e4f3',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
		[ColorSettings.GRADIENT_START]: '77.21% 96.45% at 50% 100%',
	},
	[PRESET_COLOR_PIGEON_POST]: {
		[ColorSettings.COLOR_PRIMARY]: '#E8A54B',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#E58C5D',
		[ColorSettings.COLOR_SECONDARY_STOP]: '20',
		[ColorSettings.COLOR_TERTIARY]: '#aec4dd',
		[ColorSettings.COLOR_TERTIARY_STOP]: '40',
		[ColorSettings.COLOR_TEXT]: '#41160c',
		[ColorSettings.COLOR_BORDER]: '#d8e4f2',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
		[ColorSettings.GRADIENT_START]: '77.21% 96.45% at 50% 100%',
	},
	[PRESET_COLOR_KOBI]: {
		[ColorSettings.COLOR_PRIMARY]: '#F7DBBF',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#EEABE0',
		[ColorSettings.COLOR_SECONDARY_STOP]: '100',
		[ColorSettings.COLOR_TERTIARY]: '#EEABE0',
		[ColorSettings.COLOR_TERTIARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#0e0324',
		[ColorSettings.COLOR_BORDER]: '#ffe8ee',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
		[ColorSettings.GRADIENT_START]: '78.38% 240.44% at 17.23% 25.44%',
	},
}

export const colorMap = {
	[ColorSettings.COLOR_TEXT]: { title: 'Text color' },
	[ColorSettings.COLOR_BORDER]: { title: 'Border color' },
	[ColorSettings.COLOR_PRIMARY]: { title: 'Gradient color 1' },
	[ColorSettings.COLOR_SECONDARY]: { title: 'Gradient color 2' },
	[ColorSettings.COLOR_TERTIARY]: { title: 'Gradient color 3' },
}

export const generateGradient = (
	primary: string,
	primaryStop: string,
	secondary: string,
	secondaryStop: string,
	tertiary: string,
	tertiaryStop: string,
	gradientType: string,
	gradientStart: string,
) =>
	`${
		gradientType === 'radial' ? 'radial' : 'linear'
	}-gradient(${gradientStart}, ${primary} ${primaryStop}%, ${secondary} ${secondaryStop}%, ${tertiary} ${tertiaryStop}%)`

export const getDefaultColorSettingsForIndex = (idx: number): object => {
	const keys = Object.keys(presetMap)
	const preset = presetMap[keys[idx % keys.length]]

	return {
		[ColorSettings.COLOR_TEXT]: preset[ColorSettings.COLOR_TEXT],
		[ColorSettings.COLOR_BORDER]: preset[ColorSettings.COLOR_BORDER],
		[ColorSettings.COLOR_PRIMARY]: preset[ColorSettings.COLOR_PRIMARY],
		[ColorSettings.COLOR_PRIMARY_STOP]: preset[ColorSettings.COLOR_PRIMARY_STOP],
		[ColorSettings.COLOR_SECONDARY]: preset[ColorSettings.COLOR_SECONDARY],
		[ColorSettings.COLOR_SECONDARY_STOP]: preset[ColorSettings.COLOR_SECONDARY_STOP],
		[ColorSettings.COLOR_TERTIARY]: preset[ColorSettings.COLOR_TERTIARY],
		[ColorSettings.COLOR_TERTIARY_STOP]: preset[ColorSettings.COLOR_TERTIARY_STOP],
		[ColorSettings.GRADIENT_TYPE]: preset[ColorSettings.GRADIENT_TYPE],
		[ColorSettings.GRADIENT_START]: preset[ColorSettings.GRADIENT_START],
	}
}

export const getDefaultBackgroundForIndex = (idx: number): string => {
	const keys = Object.keys(presetMap)
	const preset = presetMap[keys[idx % keys.length]]

	return generateGradient(
		preset[ColorSettings.COLOR_PRIMARY],
		preset[ColorSettings.COLOR_PRIMARY_STOP],
		preset[ColorSettings.COLOR_SECONDARY],
		preset[ColorSettings.COLOR_SECONDARY_STOP],
		preset[ColorSettings.COLOR_TERTIARY],
		preset[ColorSettings.COLOR_TERTIARY_STOP],
		preset[ColorSettings.GRADIENT_TYPE],
		preset[ColorSettings.GRADIENT_START],
	)
}

export const APP_HEIGHT = 600
export const APP_WIDTH = 360
export const PANEL_HEIGHT = '552px'
export const SLIDE_PANEL_HEADER_HEIGHT = 30
export const SLIDE_PANEL_HEIGHT = 158
export const SLIDE_PANEL_EXPAND_HEIGHT = 459

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
		href: 'account',
	},
	[STAKING]: {
		id: STAKING,
		name: 'Staking',
		icon: <StakingIcon />,
		href: 'staking',
	},
	[SETTINGS]: {
		id: SETTINGS,
		name: 'Settings',
		icon: <SettingsIcon />,
		href: 'settings',
	},
}

export const popupHtmlMap = {
	light: 'popup-theme-light.html',
	dark: 'popup-theme-dark.html',
	system: 'popup-theme-system.html',
}
