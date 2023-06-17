import { globalKeyframes, globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const containerWrapper = style([
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

export const containerInnerWrapper = style([
	sprinkles({
		position: 'relative',
		maxWidth: 'xxlarge',
		width: 'full',
	}),
	{},
])