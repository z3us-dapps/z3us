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

export const mobileBalanceTotalLabel = style([
	{
		fontSize: '16px',
		lineHeight: '20px',
	},
])

export const mobileBalanceRedGreenChange = style([
	{
		fontSize: '20px',
		lineHeight: '24px',
	},
])

export const mobileHiddenWrapper = style([
	responsiveStyle({
		mobile: { display: 'none' },
	}),
])

export const totalValueWrapper = style([
	sprinkles({
		cursor: 'pointer',
	}),
	{
		maxWidth: '330px',
		fontSize: '32px',
		lineHeight: '38px',
	},
])
