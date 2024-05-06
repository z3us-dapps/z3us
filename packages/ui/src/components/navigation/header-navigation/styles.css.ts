import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

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
		paddingX: {
			mobile: 'small',
			tablet: 'none',
		},
	}),
	{},
	responsiveStyle({
		mobile: {
			height: '58px',
		},
		tablet: {
			height: '70px',
		},
	}),
])

export const lavaNavigationMenu = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		gap: 'medium',
		paddingLeft: 'medium',
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

export const searchWrapper = style([
	sprinkles({
		flexGrow: 1,
	}),
	{},
])

export const searchComponentWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'flex-end',
		flexGrow: 1,
		paddingLeft: 'small',
	}),
	{},
])

export const headerInnerNavWrapper = style([
	sprinkles({
		width: 'full',
		alignItems: 'center',
		display: 'flex',
		gap: {
			mobile: 'xsmall',
			tablet: 'small',
		},
		paddingX: {
			mobile: 'xxsmall',
			tablet: 'none',
		},
	}),
])

export const headerBackButtonWrapper = style([
	sprinkles({
		flexGrow: 1,
		alignItems: 'center',
		display: 'flex',
		gap: {
			mobile: 'xsmall',
			tablet: 'small',
		},
	}),
	{},
])

export const headerMobileHiddenWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
	}),
	{},
])

export const tabletHiddenWrapper = style([
	sprinkles({
		display: {
			tablet: 'none',
		},
	}),
	{},
])
