import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const addressTableCellWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
		},
		alignItems: {
			mobile: 'self-start',
			tablet: 'center',
		},
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
		width: 'full',
	}),
	{
		minWidth: 0,
	},
	responsiveStyle({
		tablet: { width: '20%' },
	}),
])

export const addressTableCellAddressWrapper = style([
	sprinkles({}),
	{},
	responsiveStyle({
		tablet: {
			width: 'auto',
			flexGrow: 1,
			flexShrink: 1,
		},
	}),
])
