import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const tableWrapper = style([
	sprinkles({
		paddingX: {
			tablet: 'large',
		},
	}),
	{},
])

export const cellWrapper = style([
	sprinkles({
		position: 'relative',
		zIndex: 1,
	}),
	{},
])

export const cellContentWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		transition: 'fast',
		gap: {
			mobile: 'small',
		},
	}),
	{},
])
