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
		paddingTop: '1px',
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
		borderTopLeftRadius: 'xxxlarge',
		borderTopRightRadius: 'xxxlarge',
	}),
	{},
])

export const tabsWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
		display: 'flex',
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const tabsWrapperButton = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		position: 'relative',
		transition: 'fast',
		background: { lightMode: 'btnTertiaryBackground', hover: 'btnTertiaryBackgroundHover' },
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		flex: 1,
		outline: 0,
		height: '58px',
		selectors: {
			'&:focus-visible': {
				zIndex: '1',
			},
		},
	},
])

export const tabsWrapperButtonLeft = style([
	sprinkles({
		borderTopLeftRadius: 'xxxlarge',
	}),
	{},
])

export const tabsWrapperButtonRight = style([
	sprinkles({
		borderTopRightRadius: 'xxxlarge',
	}),
	{},
])

export const tabsWrapperButtonActive = style([
	{
		selectors: {
			'&:after': {
				content: '""',
				position: 'absolute',
				height: '2px',
				width: '100%',
				background: vars.color.purple600,
				left: '0',
				bottom: '0',
				pointerEvents: 'none',
			},
		},
	},
])

export const tabsWrapperScrollBtn = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		zIndex: 1,
	}),
	{
		left: '50%',
		marginLeft: '-16px',
	},
])

export const tabsWrapperScrollBtnHidden = style([
	sprinkles({
		opacity: 0,
		transition: 'fast',
		pointerEvents: 'none',
	}),
])

export const tabsWrapperScrollBtnScrolled = style([
	{
		position: 'absolute',
	},
])

globalStyle(`${tabsWrapperScrollBtn} > svg`, {
	transition: vars.transition.fast,
	backfaceVisibility: 'hidden',
	transform: 'rotateX(0deg) scale3d(1,1,1)',
})

globalStyle(`${tabsWrapperScrollBtnScrolled} > svg`, {
	transform: 'rotateX(180deg) scale3d(1,1,1)',
})
