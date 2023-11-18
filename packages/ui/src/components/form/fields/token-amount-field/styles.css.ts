import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const maxButtonWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		maxWidth: '200px',
	},
])
