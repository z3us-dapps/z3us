import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const assetStatisticCellWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const assetStatisticCellContentWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		transition: 'fast',
		flexDirection: 'column',
		gap: {
			mobile: 'medium',
		},
	}),
	{},
])
