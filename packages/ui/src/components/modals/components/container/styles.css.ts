import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const hidden = style([
	sprinkles({
		position: 'relative',
		pointerEvents: 'none',
		display: 'none',
	}),
	{},
])
