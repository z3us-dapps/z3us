import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const scrollAbsoluteWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		position: 'absolute',
	}),
	{},
])
