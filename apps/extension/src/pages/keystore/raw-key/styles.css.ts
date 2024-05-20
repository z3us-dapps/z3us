import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const rawKeyWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'xlarge',
		},
	}),
])

export const rawKeyInputWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: 'small',
		paddingBottom: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
])

export const rawKeyInput = style([
	{
		height: '120px',
	},
])
