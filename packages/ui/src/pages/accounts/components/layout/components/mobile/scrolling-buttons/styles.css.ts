/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const accountRoutesWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	}),

	responsiveStyle({
		mobile: {
			minHeight: 'calc(100vh - 48px - 48px)',
		},
	}),
])

export const accountRoutesMobileAccountHeader = style([
	sprinkles({
		position: 'sticky',
		top: 0,
	}),
	{},

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

export const accountRoutesScrollingStickyBtnCollectionWrapper = style([
	{
		bottom: '0px',
		top: 'unset',
	},
])

export const accountRoutesScrollingStickyBtnWrapper = style([
	sprinkles({
		position: 'sticky',
		width: 'full',
		zIndex: 2,
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
	}),
	{},
])

export const tabsWrapperButton = style([
	sprinkles({
		cursor: 'pointer',
		width: 'full',
		display: 'flex',
		justifyContent: 'center',
		position: 'relative',
		transition: 'fastall',
		background: { lightMode: 'btnTertiaryBackground', hover: 'btnTertiaryBackgroundHover' },
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		flex: 1,
		outline: 0,
		height: '58px',
		paddingTop: '23px',
		selectors: {
			'&:focus-visible': {
				zIndex: '1',
			},
			'&:after': {
				content: '""',
				position: 'absolute',
				height: '1px',
				width: '100%',
				background: vars.color.borderDivider,
				left: '0',
				bottom: '0',
				pointerEvents: 'none',
			},
		},
	},
])

export const tabsWrapperButtonSticky = style([
	sprinkles({}),
	{
		borderTopLeftRadius: '0 ',
		borderTopRightRadius: 0,
	},
])

export const tabsWrapperButtonLeft = style([
	sprinkles({
		borderTopLeftRadius: 'xxxlarge',
	}),
])

export const tabsWrapperButtonRight = style([
	sprinkles({
		borderTopRightRadius: 'xxxlarge',
	}),
])

export const tabsWrapperButtonActive = style([
	{
		selectors: {
			'&:after': {
				content: '""',
				position: 'absolute',
				height: '3px',
				width: '100%',
				background: vars.color.purple600,
				left: '0',
				bottom: '0',
				pointerEvents: 'none',
				borderTopLeftRadius: vars.border.radius.xxxlarge,
				borderTopRightRadius: vars.border.radius.xxxlarge,
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

export const searchWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
		display: 'flex',
		gap: 'xsmall',
		paddingX: 'medium',
		paddingY: 'medium',
		background: 'backgroundSecondary',
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const tabsWrapperScrollBtnScrolled = style([
	sprinkles({
		position: 'absolute',
	}),
])

export const inputSearch = style([
	sprinkles({
		width: 'full',
		padding: 'small',
	}),
	{},
])

export const inputSearchClearBtn = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

globalStyle(`${searchWrapper} ${inputSearchClearBtn}`, {
	marginRight: '0',
})

globalStyle(`${tabsWrapperScrollBtn} > svg`, {
	transition: vars.transition.fastall,
	transform: 'rotateX(0deg) translateZ(0)',
	zoom: 1.005,
	willChange: 'transform',
})

globalStyle(`${tabsWrapperScrollBtnScrolled} > svg`, {
	transform: 'rotateX(180deg) translateZ(0)',
})
