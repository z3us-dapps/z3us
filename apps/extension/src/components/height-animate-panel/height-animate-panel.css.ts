import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const heightAnimatePanelWrapper = style([
	sprinkles({
		position: 'relative',
		overflow: 'hidden',
	}),
	{},
])