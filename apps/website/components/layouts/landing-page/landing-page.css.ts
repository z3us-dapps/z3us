import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const landingWrapper = style([
	sprinkles({
		display: 'block',
	}),
	{
		minHeight: '100vh',
		minWidth: '100vw',
	},
])

export const landingWrapperContainer = style([
	sprinkles({
		display: 'block',
	}),
	{},
])
