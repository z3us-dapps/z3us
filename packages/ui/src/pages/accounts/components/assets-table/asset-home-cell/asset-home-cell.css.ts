/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const assetHomeCellWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const assetHomeCellContentWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		transition: 'fast',
		gap: {
			mobile: 'medium',
		},
	}),
	{
		height: '48px',
	},
])

export const assetHomeCellLoadingWrapper = style([
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

export const assetHomeCellLoadingMobileWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
		flexShrink: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: 'small',
	}),
	{},
])

export const assetHomeCellLoadingMobileIconsWrapper = style([
	sprinkles({
		display: 'flex',
		width: 'full',
	}),
	{},
])

globalStyle(`${assetHomeCellLoadingMobileIconsWrapper} > *:nth-child(1)`, {
	marginLeft: '0px',
})

globalStyle(`${assetHomeCellLoadingMobileIconsWrapper} > *`, {
	position: 'relative',
	marginLeft: '-10px',
})
