import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const showHideUiWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		height: 'full',
	}),
	{},
])
