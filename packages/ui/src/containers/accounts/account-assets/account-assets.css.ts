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
		mobile: {},
		tablet: {
			background: 'unset',
			minHeight: 'unset',
		},
	}),
])

globalStyle(`${accountRoutesWrapper} thead`, {
	top: '138px !important',
	position: 'relative',
	transition: vars.transition.fast,
})

globalStyle(`${accountRoutesWrapper} thead tr`, {
	position: 'relative',
})

globalStyle(`${accountRoutesWrapper} thead tr th:first-child::before`, {
	position: 'absolute',
	content: "''",
	transition: vars.transition.fast,
	top: '0',
	left: '-15px',
	right: '-15px',
	bottom: '2px',
	background: vars.color.backgroundSecondary,
})

export const accountTheadShadow = style([
	sprinkles({
		position: 'relative',
	}),
])

globalStyle(`${accountTheadShadow} thead tr th:first-child::before`, {
	boxShadow: '0px 13px 13px -14px rgba(0, 0, 0, 0.4)',
})

globalStyle(`.${darkMode} ${accountTheadShadow} thead tr th:first-child::before`, {
	boxShadow: '0px 13px 13px -14px rgba(0, 0, 0, 0.4)',
})

export const accountRoutesMobileAccountHeader = style([
	sprinkles({
		position: 'sticky',
		top: 0,
	}),
	{
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
