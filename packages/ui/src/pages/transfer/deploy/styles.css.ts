import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const transferFormWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
])
