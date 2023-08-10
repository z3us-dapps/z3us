import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

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
