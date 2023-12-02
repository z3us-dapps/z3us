/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const assetNameCellWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const assetNameCellContentWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		transition: 'fast',
		gap: {
			mobile: 'small',
		},
	}),
	{},
])

export const assetNameCellLoadingWrapper = style([
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

export const assetNameCellStatsWrapper = style([
	sprinkles({
		display: 'flex',
		gap: 'medium',
		alignItems: 'center',
		flexGrow: 1,
	}),
	{},
])

export const assetNameCellNameWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	}),
	{},
	responsiveStyle({
		mobile: {
			width: '50%',
			flexBasis: '50%',
		},
		tablet: {
			width: '100%',
			flexBasis: '100%',
		},
	}),
])

export const assetNameCellPriceWrapper = style([
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
		width: '50%',
		flexBasis: '50%',
	},
])

export const assetNameCellPriceTextWrapper = style([
	sprinkles({
		maxWidth: 'full',
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
	}),
	{},
])

export const assetNameCellBalanceWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
	}),
	{},
])
