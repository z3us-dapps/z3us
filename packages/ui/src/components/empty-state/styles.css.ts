import { style } from '@vanilla-extract/css'

import { sprinkles } from '../system/sprinkles.css'

export const emptyStateWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		minHeight: '20px',
	},
])
