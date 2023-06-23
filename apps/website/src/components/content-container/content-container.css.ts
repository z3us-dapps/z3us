import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const contentContainerWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		justifyContent: 'center',
		paddingX: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
	}),
	{},
])

export const contentContainerInnerWrapper = style([
	sprinkles({
		position: 'relative',
		maxWidth: 'xxlarge',
		width: 'full',
	}),
	{},
])
