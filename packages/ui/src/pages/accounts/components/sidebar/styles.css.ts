import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const sideBarWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: {
			mobile: 'none',
			tablet: 'small',
		},
		paddingBottom: {
			mobile: 'none',
			tablet: 'xsmall',
		},
		height: {
			tablet: 'full',
		},
	}),
])
