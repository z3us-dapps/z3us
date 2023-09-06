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
			mobile: 'medium',
			tablet: 'xxlarge',
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
		position: 'relative',
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
		display: 'flex',
		gap: 'medium',
		paddingLeft: 'xlarge',
	}),
	{
		listStyleType: 'none',
	},
])

export const headerDesktopNavWrapper = style([
	sprinkles({
		width: 'full',
		alignItems: 'center',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
	}),
	{},
])

export const headerMobileNavWrapper = style([
	sprinkles({
		width: 'full',
		alignItems: 'center',
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
	}),
	{},
])
