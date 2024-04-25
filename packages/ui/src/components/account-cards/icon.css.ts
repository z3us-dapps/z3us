import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const icon = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'medium',
		border: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		flexShrink: 0,
		overflow: 'hidden',
	}),
	{
		width: '40px',
		backgroundSize: 'cover',
		aspectRatio: '8 / 6',
	},
])
