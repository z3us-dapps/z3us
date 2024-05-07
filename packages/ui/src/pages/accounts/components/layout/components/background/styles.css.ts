import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const accountsBgCardWrapper = style([
	sprinkles({
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		background: 'backgroundPrimary',
		pointerEvents: 'none',
	}),
	{
		top: '-58px',
	},
])