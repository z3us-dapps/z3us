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

export const accountsTableMinHeightWrapper = style([
	sprinkles({}),
	{
		minHeight: '420px',
	},
])

globalStyle(`${accountRoutesWrapper} thead`, {
	top: '138px !important',
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

export const assetsTableWrapper = style([
	sprinkles({
		position: 'relative',
		paddingX: {
			tablet: 'large',
		},
	}),
	{},
])

export const mobileHideTableCellWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'table-cell',
		},
	}),
	{},
])

export const assetsHomeWrapper = style([
	sprinkles({
		position: 'relative',
		paddingY: {
			tablet: 'xlarge',
		},
	}),
])

export const assetsHomeTitleWrapper = style([
	sprinkles({
		paddingX: {
			tablet: 'xlarge',
		},
	}),
])

export const assetsHomeList = style([
	sprinkles({
		marginTop: 'medium',
		paddingX: 'medium',
		padding: 'none',
		display: 'flex',
		flexDirection: 'column',
	}),
	{ listStyle: 'none' },
])

export const assetsHomeListLink = style([
	sprinkles({
		position: 'relative',
		paddingY: 'xlarge',
		paddingX: 'large',
		display: 'flex',
		textDecoration: 'none',
		transition: 'fast',
		borderRadius: 'large',
		background: {
			hover: 'bai_pearl200',
		},
		boxShadow: {
			hover: 'shadowActivePanel',
		},
	}),
	{
		':after': {
			content: '""',
			position: 'absolute',
			left: vars.spacing.large,
			right: vars.spacing.large,
			top: 0,
			backgroundColor: vars.color.borderDivider,
			pointerEvents: 'none',
			height: '1px',
			transition: vars.transition.fast,
		},
		selectors: {
			[`.${darkMode} &:hover`]: {
				background: vars.color.wax500,
			},
		},
	},
])

globalStyle(`${assetsHomeList} ${assetsHomeListLink}:hover::after`, {
	opacity: '0',
})

globalStyle(`${assetsHomeList} li:first-child ${assetsHomeListLink}`, {
	marginBottom: '-1px',
})

globalStyle(`${assetsHomeList} li:first-child ${assetsHomeListLink}::after`, {
	display: 'none',
})
