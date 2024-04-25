import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const accountsHomeHorizontalCard = style([
	sprinkles({
		flexShrink: 0,
		position: 'relative',
		overflow: 'hidden',
		borderRadius: 'xlarge',
		cursor: 'pointer',
	}),
	{
		width: '316px',
		aspectRatio: '8 / 5',
	},
])
