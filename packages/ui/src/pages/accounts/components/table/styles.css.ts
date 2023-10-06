import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const tableWrapper = style([
	sprinkles({
		background: 'backgroundSecondary',
		paddingX: {
			tablet: 'large',
		},
	}),
	{
		minHeight: '600px',
	},
])

export const emptyStateWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
		paddingY: 'large',
	}),
	{},
])

export const mobileHideTableCellWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'table-cell',
		},
	}),
	{},
])
