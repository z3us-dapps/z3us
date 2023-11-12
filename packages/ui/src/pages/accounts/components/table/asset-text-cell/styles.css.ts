import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const assetTextCellWrapper = style([
	sprinkles({
		position: 'relative',
		zIndex: 1,
	}),
	{},
])
