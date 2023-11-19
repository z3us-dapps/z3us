import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const marginWrapper = style([
	sprinkles({
		color: 'colorNeutral',
		marginBottom: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const olUlWrapper = style([
	sprinkles({
		marginLeft: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
	{},
])

export const headingWrapper = style([
	sprinkles({
		color: 'colorStrong',
	}),
	{},
])
