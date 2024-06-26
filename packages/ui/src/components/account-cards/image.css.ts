import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const wrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		display: 'flex',
		justifyContent: 'center',
		width: 'full',
		height: 'full',
		maxWidth: 'full',
		pointerEvents: 'none',
	}),
	{
		maxHeight: '376px',
	},
])

export const wrapperImg = style([
	sprinkles({
		position: 'absolute',
		width: 'full',
		height: 'full',
	}),
])
