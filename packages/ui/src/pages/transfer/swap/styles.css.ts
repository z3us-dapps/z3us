/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const swapDropdownContentWrapper = style([
	{
		minWidth: '160px',
	},
])

export const swapFromButtonWrapper = style([
	sprinkles({
		position: 'relative',
		paddingTop: 'xlarge',
	}),
	{},
])

export const swapExchangeButtonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		paddingBottom: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
	{},
])

export const swapFormFieldWrapper = style([
	sprinkles({
		display: 'flex',
		width: 'full',
		flexDirection: 'column',
		gap: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
])
