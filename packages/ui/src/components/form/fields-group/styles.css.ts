import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const formFieldGroupWithError = style([
	sprinkles({
		border: 1,
		borderColor: 'red500',
		borderStyle: 'solid',
		borderRadius: 'small',
		padding: 'small',
		color: 'colorStrong',
	}),
	{},
])
