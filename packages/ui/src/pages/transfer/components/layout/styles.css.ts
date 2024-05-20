import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const pageWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		paddingTop: {
			tablet: 'small',
			desktop: 'medium',
		},
	}),
])
