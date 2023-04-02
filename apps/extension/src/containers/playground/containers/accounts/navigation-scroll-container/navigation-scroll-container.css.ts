import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const scrollWrapper = style([
	sprinkles({
		position: 'relative',
		height: 'full',
		width: 'full',
		background: 'backgroundPrimary',
	}),
	{},
])

export const scrollPaddingWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		paddingTop: '48px',
	},
])

export const headerWrapper = style([
	sprinkles({
		zIndex: 1,
	}),
	{},
])
