import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const landingWrapper = style([
	sprinkles({
		display: 'block',
	}),
	{
		width: '100vw',
		height: '100vh',
		border: '2px solid red',
	},
])
