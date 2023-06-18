import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const landingWrapper = style([
	sprinkles({
		display: 'block',
	}),
	{
		gap: '1em',
	},
])
