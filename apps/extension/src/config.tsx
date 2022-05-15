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
export const PRESET_COLOR_LIGHT_ORCHID = 'preset_color_light_orchid'
export const PRESET_COLOR_MINDARO = 'preset_color_mindaro'
export const PRESET_COLOR_CERISE = 'preset_color_cerise'
export const PRESET_COLOR_JACARTA = 'preset_color_jacarta'
export const PRESET_COLOR_CORNFLOW_BLUE = 'preset_color_cornflower_blue'
export const PRESET_COLOR_MARTINIQUE = 'preset_color_martinique'

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
	},
	//[PRESET_COLOR_LIGHT_ORCHID]: {
	//[ColorSettings.COLOR_PRIMARY]: '#eeabe0',
	//[ColorSettings.COLOR_PRIMARY_STOP]: '0',
	//[ColorSettings.COLOR_SECONDARY]: '#f7dbbf',
	//[ColorSettings.COLOR_SECONDARY_STOP]: '100',
	//[ColorSettings.COLOR_TEXT]: '#330867',
	//[ColorSettings.COLOR_BORDER]: '#cedff2',
	//[ColorSettings.GRADIENT_TYPE]: 'radial',
	//},
	//[PRESET_COLOR_MINDARO]: {
	//[ColorSettings.COLOR_PRIMARY]: '#d8fb91',
	//[ColorSettings.COLOR_PRIMARY_STOP]: '0',
	//[ColorSettings.COLOR_SECONDARY]: '#55b3c8',
	//[ColorSettings.COLOR_SECONDARY_STOP]: '100',
	//[ColorSettings.COLOR_TEXT]: '#330867',
	//[ColorSettings.GRADIENT_TYPE]: 'radial',
	//},
	//[PRESET_COLOR_CERISE]: {
	//[ColorSettings.COLOR_PRIMARY]: '#d83773',
	//[ColorSettings.COLOR_PRIMARY_STOP]: '0',
	//[ColorSettings.COLOR_SECONDARY]: '#392617',
	//[ColorSettings.COLOR_SECONDARY_STOP]: '100',
	//[ColorSettings.COLOR_TEXT]: '#e8d1bf',
	//[ColorSettings.GRADIENT_TYPE]: 'radial',
	//},
	//[PRESET_COLOR_JACARTA]: {
	//[ColorSettings.COLOR_PRIMARY]: '#3c2a61',
	//[ColorSettings.COLOR_PRIMARY_STOP]: '0',
	//[ColorSettings.COLOR_SECONDARY]: '#33069e',
	//[ColorSettings.COLOR_SECONDARY_STOP]: '100',
	//[ColorSettings.COLOR_TEXT]: '#ddfaff',
	//[ColorSettings.GRADIENT_TYPE]: 'radial',
	//},
	//[PRESET_COLOR_CORNFLOW_BLUE]: {
	//[ColorSettings.COLOR_PRIMARY]: '#7980f4',
	//[ColorSettings.COLOR_PRIMARY_STOP]: '0',
	//[ColorSettings.COLOR_SECONDARY]: '#f2cacd',
	//[ColorSettings.COLOR_SECONDARY_STOP]: '100',
	//[ColorSettings.COLOR_TEXT]: '#ffe9ff',
	//[ColorSettings.GRADIENT_TYPE]: 'radial',
	//},
	//[PRESET_COLOR_MARTINIQUE]: {
	//[ColorSettings.COLOR_PRIMARY]: '#282c4e',
	//[ColorSettings.COLOR_PRIMARY_STOP]: '50',
	//[ColorSettings.COLOR_SECONDARY]: '#04211e',
	//[ColorSettings.COLOR_SECONDARY_STOP]: '150',
	//[ColorSettings.COLOR_TEXT]: '#defffb',
	//[ColorSettings.GRADIENT_TYPE]: 'radial',
	//},
}

export const colorMap = {
	[ColorSettings.COLOR_TEXT]: { title: 'Text color' },
	[ColorSettings.COLOR_BORDER]: { title: 'Border color' },
	[ColorSettings.COLOR_PRIMARY]: { title: 'Gradient color 1' },
	[ColorSettings.COLOR_SECONDARY]: { title: 'Gradient color 2' },
	[ColorSettings.COLOR_TERTIARY]: { title: 'Gradient color 3' },
}

export const generateGradient = (
	gradientType: string,
	primary: string,
	primaryStop: string,
	secondary: string,
	secondaryStop: string,
	tertiary: string,
	tertiaryStop: string,
) => {
	const isRadialGradient = gradientType === 'radial'
	return isRadialGradient
		? `radial-gradient(77.21% 96.45% at 50% 100%, ${primary} ${primaryStop}%, ${secondary} ${secondaryStop}%, ${tertiary} ${tertiaryStop}%)`
		: `linear-gradient(90deg, ${primary} ${primaryStop}%, ${secondary} ${secondaryStop}%)`
}

export const getDefaultColorSettingsForIndex = (idx: number): object => {
	const keys = Object.keys(presetMap)
	const preset = presetMap[keys[idx % keys.length]]

	return {
		[ColorSettings.COLOR_TEXT]: preset[ColorSettings.COLOR_TEXT],
		[ColorSettings.GRADIENT_TYPE]: preset[ColorSettings.GRADIENT_TYPE],
		[ColorSettings.COLOR_PRIMARY]: preset[ColorSettings.COLOR_PRIMARY],
		[ColorSettings.COLOR_PRIMARY_STOP]: preset[ColorSettings.COLOR_PRIMARY_STOP],
		[ColorSettings.COLOR_SECONDARY]: preset[ColorSettings.COLOR_SECONDARY],
		[ColorSettings.COLOR_SECONDARY_STOP]: preset[ColorSettings.COLOR_SECONDARY_STOP],
	}
}

export const getDefaultBackgroundForIndex = (idx: number): string => {
	const keys = Object.keys(presetMap)
	const preset = presetMap[keys[idx % keys.length]]

	return generateGradient(
		preset[ColorSettings.GRADIENT_TYPE],
		preset[ColorSettings.COLOR_PRIMARY],
		preset[ColorSettings.COLOR_PRIMARY_STOP],
		preset[ColorSettings.COLOR_SECONDARY],
		preset[ColorSettings.COLOR_SECONDARY_STOP],
		preset[ColorSettings.COLOR_TERTIARY],
		preset[ColorSettings.COLOR_TERTIARY_STOP],
	)
}

export const APP_HEIGHT = 600
export const APP_WIDTH = 360
export const PANEL_HEIGHT = '552px'
export const SLIDE_PANEL_HEADER_HEIGHT = 30
export const SLIDE_PANEL_HEIGHT = 140
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
