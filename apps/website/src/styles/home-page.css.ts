import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const indexAppWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])
