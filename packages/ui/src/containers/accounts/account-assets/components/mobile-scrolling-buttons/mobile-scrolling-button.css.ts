/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const accountRoutesWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	}),

	responsiveStyle({
		mobile: {
			background: '#8A4AE1',
			minHeight: 'calc(100vh - 58px - 48px)',
		},
	}),
])

export const accountRoutesMobileAccountHeader = style([
	sprinkles({
		position: 'sticky',
		top: 0,
	}),
	{
		// border: '1px solid red',
		// height: '300px',
	},

	responsiveStyle({
		mobile: {
			height: '300px',
		},
		tablet: {
			height: 'unset',
		},
	}),
])

export const accountRoutesScrollingWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
	}),
	{},
])

export const accountRoutesScrollingStickySheet = style([
	sprinkles({
		position: 'sticky',
		top: 0,
	}),
	{
		height: '0px',
		background: 'green',
		'::before': {
			content: '" "',
			position: 'absolute',
			bottom: '-calc(100vh - 300px)',
			height: 'calc(100vh - 300px)',
			left: '0',
			right: '0',
			pointerEvents: 'none',
			backgroundColor: vars.color.backgroundSecondary,
			borderTopLeftRadius: vars.border.radius.xxxlarge,
			borderTopRightRadius: vars.border.radius.xxxlarge,
		},
	},
])

export const accountRoutesScrollingStickyBtnWrapper = style([
	sprinkles({
		position: 'sticky',
		zIndex: 1,
		display: {
			mobile: 'block',
			tablet: 'none',
		},
	}),
	{
		top: '-1px',
	},
])

export const accountRoutesScrollingStickyShadow = style([
	sprinkles({
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const accountRoutesScrollingStickyBtnInner = style([
	sprinkles({
		position: 'relative',
		background: 'backgroundSecondary',
		borderTopLeftRadius: 'xxxlarge',
		borderTopRightRadius: 'xxxlarge',
		padding: 'xlarge',
	}),
	{
		minHeight: '58px',
	},
])
