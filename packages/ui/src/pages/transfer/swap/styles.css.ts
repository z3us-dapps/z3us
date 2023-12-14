import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

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
		alignItems: 'center',
		paddingBottom: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
	{},
])

export const swapValidationWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		paddingBottom: 'medium',
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
