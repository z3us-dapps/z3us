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
			// background: '#8A4AE1',
			// minHeight: 'calc(100vh - 58px - 48px)',
		},
		tablet: {
			background: 'unset',
			minHeight: 'unset',
		},
	}),
])

globalStyle(`${accountRoutesWrapper} thead`, {
	top: '120px !important',
	transition: vars.transition.fast,
})

export const accountTheadShadow = style([
	sprinkles({
		position: 'relative',
	}),
])

globalStyle(`${accountTheadShadow} thead`, {
	boxShadow: '0px 13px 13px -14px rgba(0, 0, 0, 0.4)',
})

globalStyle(`.${darkMode} ${accountTheadShadow} thead`, {
	boxShadow: '0px 13px 13px -14px rgba(0, 0, 0, 0.4)',
})

export const accountRoutesMobileAccountHeader = style([
	sprinkles({
		position: 'sticky',
		top: 0,
	}),
	{
		// border: '1px solid red',
		height: '300px',
	},
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
		display: {
			mobile: 'block',
			tablet: 'none',
		},
	}),
	{
		height: '0px',
		'::before': {
			content: '" "',
			position: 'absolute',
			bottom: '-calc(100vh - 100px)',
			height: 'calc(100vh - 100px)',
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
		top: 0,
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
		zIndex: 1,
		minHeight: '58px',
	},
])
