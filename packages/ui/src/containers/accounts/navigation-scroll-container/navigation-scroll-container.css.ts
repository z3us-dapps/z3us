import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const scrollWrapper = style([
	sprinkles({
		position: 'relative',
		height: 'full',
		width: 'full',
		background: {
			lightMode: 'backgroundPrimary',
			darkMode: 'backgroundSecondary',
		},
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
