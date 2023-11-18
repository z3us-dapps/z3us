import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const nftNameCellWrapper = style([
	sprinkles({
		position: 'relative',
		zIndex: 1,
	}),
	{},
])

export const nftNameCellContentWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		transition: 'fast',
		gap: {
			mobile: 'medium',
		},
	}),
	{},
])

export const nftNameCellLoadingWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		pointerEvents: 'none',
		transition: 'fast',
		display: 'flex',
		gap: 'medium',
		alignItems: 'center',
		opacity: 0,
	}),
	{},
])

export const nftNameCellStatsWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: {
			mobile: 'center',
		},
		gap: 'medium',
		flexGrow: 1,
	}),
	{},
])

export const nftNameCellNameWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	}),
	{},
	responsiveStyle({
		mobile: {
			width: '70%',
			flexBasis: '70%',
		},
		tablet: {
			width: '100%',
			flexBasis: '100%',
		},
	}),
])

export const nftNameCellNameIdWrapper = style([
	{},
	responsiveStyle({
		mobile: {
			display: 'flex',
		},
		tablet: {
			display: 'none',
		},
	}),
])

export const nftNameCellPriceWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
		flexDirection: 'column',
		flexGrow: 1,
		alignItems: 'flex-end',
	}),
	{
		width: '30%',
		flexBasis: '30%',
	},
])

export const nftNameCellBalanceWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
	}),
	{},
])
