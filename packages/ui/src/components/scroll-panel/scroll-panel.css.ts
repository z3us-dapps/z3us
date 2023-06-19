import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		background: 'backgroundSecondary',
		boxShadow: 'shadowPanel',
		borderRadius: 'xlarge',
		overflow: 'hidden',
		transition: 'slow',
	}),
	{},
])
