import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const addressTableCellWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexShrink: 0,
		gap: 'medium',
	}),
	{},
])

export const addressTableCellTextWrapper = style([
	sprinkles({
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 'xxsmall',
	}),
	{
		minWidth: 0,
	},
])
