import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const navigationWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		borderBottomStyle: 'solid',
		zIndex: 2,
		borderColor: {
			lightMode: 'bleached_silk600',
			darkMode: 'lead500',
		},
		paddingX: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
	}),
	{},
	responsiveStyle({
		tablet: {
			borderBottomWidth: '1px',
		},
	}),
])

export const navigationInnerWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	responsiveStyle({
		mobile: {
			height: '58px',
		},
		tablet: {
			height: '70px',
		},
	}),
])

export const navigationMenu = style([
	sprinkles({
		flexGrow: 1,
		gap: 'medium',
		paddingLeft: 'xlarge',
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
	}),
	{
		listStyleType: 'none',
	},
])

export const navigationMenuActiveLine = style([
	sprinkles({
		position: 'absolute',
		inset: 0,
		pointerEvents: 'none',
		borderRadius: 'xlarge',
		background: {
			lightMode: 'white',
			darkMode: 'backgroundSecondary',
		},
	}),
	{
		height: '100%',
		width: '100%',
	},
])

export const copiedAnimationWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		height: '24px',
		width: '24px',
	},
])

export const accountsHomeMobileHeader = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		left: 0,
		width: 'full',
		pointerEvents: 'none',
		display: 'flex',
		justifyContent: 'flex-end',
		transition: 'fast',
	}),
	{
		height: '48px',
	},
])

export const accountsHomeMobileHeaderShadow = style([
	sprinkles({
		background: 'backgroundPrimary',
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const accountsHomeMobileHeaderWalletWrapper = style([
	sprinkles({
		pointerEvents: 'auto',
		display: 'flex',
		alignItems: 'center',
		paddingX: 'small',
	}),
	{
		height: '48px',
		width: '100%',
	},
])
