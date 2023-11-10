import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const addressTableCellWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		flexShrink: 0,
		gap: 'medium',
		maxWidth: 'full',
	}),
	{},
])

export const addressTableCellTextWrapper = style([
	sprinkles({
		flexShrink: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 'small',
	}),
	{
		width: '20%',
		minWidth: 0,
	},
])

export const addressTableCellAddressWrapper = style([
	sprinkles({
		flexGrow: 1,
		flexShrink: 1,
	}),
	{
		width: 'auto',
	},
])
