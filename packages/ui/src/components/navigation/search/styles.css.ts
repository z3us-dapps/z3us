import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const searchWrapper = style([
	sprinkles({
		position: 'relative',
		paddingLeft: 'medium',
		display: 'flex',
		justifyContent: 'flex-end',
		flexGrow: 1,
	}),
	{},
])
