import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const overlayAssetIconsWrapper = style([
	sprinkles({
		position: {
			mobile: 'relative',
			tablet: 'absolute',
		},
		display: 'flex',
		flexDirection: {
			mobile: 'row-reverse',
			tablet: 'row',
		},
		gap: {
			mobile: 'xsmall',
			tablet: 'medium',
		},
		justifyContent: {
			mobile: 'flex-end',
			tablet: 'flex-start',
		},
		top: 0,
		right: 0,
		height: 'full',
		alignItems: 'center',
		pointerEvents: 'none',
		color: 'colorNeutral',
	}),
	{},
	responsiveStyle({
		mobile: { marginTop: '0px' },
		tablet: { marginTop: '-10px' },
	}),
])

export const overlayAssetIconCircleWrapper = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		pointerEvents: 'auto',
	}),
	{
		boxShadow: `0 0 0 2px ${vars.color.backgroundSecondary}`,
		marginLeft: '-9px',
		selectors: {
			[`&:hover`]: {
				zIndex: 1,
			},
		},
	},
])

export const overlayAssetIconSquareWrapper = style([
	sprinkles({
		position: 'relative',
		pointerEvents: 'auto',
	}),
	{
		borderRadius: vars.border.radius.small,
		boxShadow: `0 0 0 2px ${vars.color.backgroundSecondary}`,
		marginLeft: '-9px',
		selectors: {
			[`&:hover`]: {
				zIndex: 1,
			},
		},
	},
])

globalStyle(`${overlayAssetIconsWrapper} button:first-child`, {
	marginLeft: '0',
})

export const overlayAssetChevronWrapper = style([
	sprinkles({
		paddingLeft: 'small',
		display: {
			mobile: 'none',
			tablet: 'block',
		},
	}),
	{},
])
