import { style } from '@vanilla-extract/css'

import { sprinkles } from '../system/sprinkles.css'

export const animatedPageWrapper = style([
	sprinkles({
		zIndex: 1,
		position: 'absolute',
		height: 'full',
		width: 'full',
		left: 0,
		top: 0,
	}),
	{},
])
