import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const validatorInnerWrapper = style([
	sprinkles({
		position: 'fixed',
		zIndex: 2,
		background: 'backgroundSecondary',
		boxShadow: 'shadowPanel',
		overflow: 'hidden',
		color: 'colorNeutral',
		height: 'vh100',
		right: 0,
		top: 0,
	}),
	{
		width: '300px',
		zIndex: 2,
	},
	responsiveStyle({
		// mobile: { height: '48px' },
		// tablet: { height: '64px' },
	}),
])
