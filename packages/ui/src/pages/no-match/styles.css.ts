import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const notFound404ButtonWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
])
