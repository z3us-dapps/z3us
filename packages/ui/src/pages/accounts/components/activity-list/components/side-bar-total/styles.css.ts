import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const mobileHomeBalanceWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
		flexDirection: 'column',
		alignItems: 'center',
	}),
	{},
])

export const mobileHiddenWrapper = style([
	responsiveStyle({
		mobile: { display: 'none' },
	}),
])

export const totalValueWrapper = style([
	{
		cursor: 'pointer',
	},
])
