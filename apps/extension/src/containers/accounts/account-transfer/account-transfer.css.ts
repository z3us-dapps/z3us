import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const transferWrapper = style([
	sprinkles({
		paddingX: {
			mobile: 'medium',
			tablet: 'xlarge',
			desktop: 'xlarge',
		},
		paddingY: {
			mobile: 'medium',
			tablet: 'xlarge',
			desktop: 'xlarge',
		},
	}),
	{},
])

export const transferFlexColWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'large',
	}),
	{},
])
