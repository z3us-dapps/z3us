import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const assetsHeaderWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		zIndex: 1,
	}),
])

export const totalValueWrapper = style([
	sprinkles({
		display: 'inline-flex',
		cursor: 'pointer',
	}),
	{},
])
