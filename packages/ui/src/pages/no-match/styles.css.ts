import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

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
