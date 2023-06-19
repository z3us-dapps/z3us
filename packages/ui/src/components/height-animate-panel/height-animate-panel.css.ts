import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const heightAnimatePanelWrapper = style([
	sprinkles({
		position: 'relative',
		overflow: 'hidden',
	}),
	{},
])
