import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const explorerMenuWrapper = style([
	sprinkles({
		position: 'relative',
	}),
])

export const explorerMenuDropdownWrapper = style([
	sprinkles({}),
	{
		width: '225px',
	},
])
