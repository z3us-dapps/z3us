import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const extendedKeyWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'xlarge',
		},
	}),
])

export const extendedKeyInputWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: 'small',
		paddingBottom: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
])

export const extendedKeyInput = style([
	{
		height: '120px',
	},
])
