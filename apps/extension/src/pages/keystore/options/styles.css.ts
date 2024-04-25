import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const keystoreOptionsWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'xlarge',
		},
	}),
	{},
])

export const keystoreOptionsButtonsWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])
