import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const qrPopOverWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		maxWidth: '300px',
	},
])
