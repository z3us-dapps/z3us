import React from 'react'
import { AccountsIcon, StakingIcon, SwapIcon, SettingsIcon } from 'ui/src/components/icons'
import { ColorSettings, PoolType } from '@src/types'

export const defaultAccountStoreKey = 'z3us-store'

export const sharedStoreKey = 'z3us-store-shared'

export const defaultToken = { order: Number.MAX_SAFE_INTEGER }

export const defaultTokenSettings = {
	xrd: { image: 'images/token-images/xrd.png', order: 0 },
	oci: { image: 'images/token-images/oci.png', order: 1 },
	dgc: { image: 'images/token-images/dgc.png', order: 2 },
}

export const PRESET_COLOR_HELIOTROPE_SUNRISE = 'preset_color_heliotrope_sunrise'
export const PRESET_COLOR_PIGEON_POST = 'preset_color_pigeon_post'
export const PRESET_COLOR_KOBI = 'preset_color_pigeon_kobi'
export const PRESET_COLOR_HIBISCUS = 'preset_color_hibiscus'
export const PRESET_COLOR_PORT_GORE = 'preset_color_port_gore'
export const PRESET_COLOR_CORNFLOWER_BLUE = 'preset_color_cornflower_blue'

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
		[ColorSettings.COLOR_SECONDARY]: '#f2bec8',
		[ColorSettings.COLOR_SECONDARY_STOP]: '50',
		[ColorSettings.COLOR_TERTIARY]: '#EEABE0',
		[ColorSettings.COLOR_TERTIARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#0e0324',
		[ColorSettings.COLOR_BORDER]: '#ffe8ee',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
		[ColorSettings.GRADIENT_START]: '78.38% 240.44% at 17.23% 25.44%',
	},
	[PRESET_COLOR_HIBISCUS]: {
		[ColorSettings.COLOR_PRIMARY]: '#d13066',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#953153',
		[ColorSettings.COLOR_SECONDARY_STOP]: '50',
		[ColorSettings.COLOR_TERTIARY]: '#332217',
		[ColorSettings.COLOR_TERTIARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#e5cbb7',
		[ColorSettings.COLOR_BORDER]: '#332217',
		[ColorSettings.GRADIENT_TYPE]: 'linear',
		[ColorSettings.GRADIENT_START]: '180deg',
	},
	[PRESET_COLOR_PORT_GORE]: {
		[ColorSettings.COLOR_PRIMARY]: '#342559',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#311973',
		[ColorSettings.COLOR_SECONDARY_STOP]: '50',
		[ColorSettings.COLOR_TERTIARY]: '#2d0792',
		[ColorSettings.COLOR_TERTIARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#d8f9ff',
		[ColorSettings.COLOR_BORDER]: '#d8f9ff',
		[ColorSettings.GRADIENT_TYPE]: 'linear',
		[ColorSettings.GRADIENT_START]: '90deg',
	},
	[PRESET_COLOR_CORNFLOWER_BLUE]: {
		[ColorSettings.COLOR_PRIMARY]: '#3a3ea2',
		[ColorSettings.COLOR_PRIMARY_STOP]: '0',
		[ColorSettings.COLOR_SECONDARY]: '#4348d6',
		[ColorSettings.COLOR_SECONDARY_STOP]: '50',
		[ColorSettings.COLOR_TERTIARY]: '#777bf0 ',
		[ColorSettings.COLOR_TERTIARY_STOP]: '100',
		[ColorSettings.COLOR_TEXT]: '#ffe6ff',
		[ColorSettings.COLOR_BORDER]: '#ffe6ff',
		[ColorSettings.GRADIENT_TYPE]: 'radial',
		[ColorSettings.GRADIENT_START]: '49.21% 50.45% at 50% 0%',
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

export const getDefaultColorSettingsForIndex = (idx: number): { [key in ColorSettings]: string } => {
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

export const XRD_RRI = 'xrd_rr1qy5wfsfh'
export const FLOOP_RRI = 'floop_rr1q0p0hzap6ckxqdk6khesyft62w34e0vdd06msn9snhfqknl370'
export const OCI_TEST_RRI = 'oci_rr1qwr8cx5ezp9t08ptsxrws0w05ldy6nekvy9ef0fp854qmv2fk4'

export const Z3US_URL = 'https://z3us.com'
export const Z3US_RRI = 'z3us_rr1q0gxzdty8egrkegk9lnteth09sgzqgxaw5ytqzq24ceq3eqagc'
export const Z3US_WALLET_MAIN = 'rdx1qsp5rwdg4r7uhmwra92qg0qughm73vycevwwzumw6whsfgjjngmwj3sfvqjl0'
export const Z3US_WALLET_BURN = 'rdx1qsp5t323zwxmryk73gsupn0uu0jns9zpjqts79d6lspwqr2jclllpygyfaly8'
export const Z3US_WALLET_NEWS = 'rdx1qspvwvpu7xkkvp53mkl8xh8kxk9m8uf2vk62kumhzfj4zf6ytfrsckqvhdrk3'
export const Z3US_FEE_RATIO = 2 / 1000

export const swapServices = {
	[PoolType.OCI]: {
		enabled: true,
		image: '',
	},
	[PoolType.CAVIAR]: {
		enabled: true,
		image: 'images/caviar/image_2022-07-28_17-31-25.png',
	},
	[PoolType.DOGECUBEX]: {
		enabled: true,
		image: '',
	},
}

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
	[SWAP]: {
		id: SWAP,
		name: 'Swap',
		icon: <SwapIcon />,
		href: 'swap',
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
