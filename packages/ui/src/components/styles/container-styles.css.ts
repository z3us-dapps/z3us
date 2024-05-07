import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const containerWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		justifyContent: 'center',
		paddingX: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xxlarge',
		},
	}),
])

export const containerInnerWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		maxWidth: '1344px',
	}),
])
