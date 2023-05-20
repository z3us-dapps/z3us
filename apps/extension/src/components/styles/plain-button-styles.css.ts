import { style } from '@vanilla-extract/css'
import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const plainButtonHoverWrapper = style([
	sprinkles({
		cursor: 'pointer',
		transition: 'fast',
		color: {
			lightMode: 'colorNeutral',
			hover: 'colorStrong',
		},
	}),
])
