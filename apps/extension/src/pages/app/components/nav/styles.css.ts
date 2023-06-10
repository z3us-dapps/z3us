import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

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
