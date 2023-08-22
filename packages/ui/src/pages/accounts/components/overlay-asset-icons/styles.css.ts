import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const overlayAssetIconsWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		marginRight: 'medium',
		height: 'full',
		alignItems: 'center',
		pointerEvents: 'none',
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
	}),
	{},
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

globalStyle(`${overlayAssetIconsWrapper} a:first-child`, {
	marginLeft: '0',
})
