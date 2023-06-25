import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const headerWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{
		height: '70px',
	},
])

export const landingHeaderBrandWrapper = style([
	sprinkles({
		flexGrow: 1,
	}),
	{},
])
