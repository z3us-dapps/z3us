import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const indexAppWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])
