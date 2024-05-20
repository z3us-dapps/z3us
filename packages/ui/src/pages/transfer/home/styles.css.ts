import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const formWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
])
