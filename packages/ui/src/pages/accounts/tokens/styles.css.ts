import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const tableWrapper = style([
	sprinkles({
		position: 'relative',
		paddingX: {
			tablet: 'large',
		},
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

export const tableMinHeightWrapper = style([
	sprinkles({}),
	{
		minHeight: '420px',
	},
])