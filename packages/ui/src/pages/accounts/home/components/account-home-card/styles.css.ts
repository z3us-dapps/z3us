import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const accountsHomeHorizontalCard = style([
	sprinkles({
		flexShrink: 0,
		position: 'relative',
		overflow: 'hidden',
		boxShadow: 'shadowDropdown',
		borderRadius: 'xlarge',
	}),
	{
		width: '316px',
		aspectRatio: '8 / 5',
	},
])
