import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const container = sprinkles({
	background: 'backgroundSecondary',
	color: 'colorNeutral',
	position: 'relative',
	height: 'vh100',
	width: 'vw100',
	overflow: 'clip',
})

export const teststyle = style([
	sprinkles({
		position: 'relative',
		background: {
			hover: 'red800',
			focus: 'red900',
		},
	}),
	{
		border: '1px solid green',
		'@media': {
			[`screen and (min-width: 480px)`]: {
				flexBasis: '50%',
			},
		},
	},
	responsiveStyle({
		mobile: { width: '100%' },
		tablet: { width: '33%' },
		desktop: { width: '25%' },
	}),
])

export const tempNav = style([
	sprinkles({
		position: 'fixed',
		bottom: 0,
		right: 0,
		zIndex: 1,
	}),
	{
		fontSize: '11px',
	},
])
