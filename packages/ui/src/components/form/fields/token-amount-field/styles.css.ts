import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const maxButtonWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		maxWidth: '200px',
	},
])
