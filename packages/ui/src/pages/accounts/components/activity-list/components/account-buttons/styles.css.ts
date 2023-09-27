import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const cardButtonsWrapper = style([
	sprinkles({
		display: 'none',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
	}),
	{},
])

export const cardButtonsWrapperVisible = style([
	{
		display: 'flex',
	},
])
