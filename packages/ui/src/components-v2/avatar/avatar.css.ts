import { style } from '@vanilla-extract/css'

import { sprinkles } from '../system/sprinkles.css'

export const avatarRoot = style([
	sprinkles({
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'full',
		overflow: 'clip',
	}),
	{
		userSelect: 'none',
		width: 48,
		height: 48,
		maxHeight: '100%',
		maxWidth: '100%',
	},
])

export const avatarImage = style([
	sprinkles({
		width: 'full',
		height: 'full',
	}),
	{
		objectFit: 'cover',
	},
])

export const avatarFallback = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
		height: 'full',
		background: {
			lightMode: 'bleached_silk500',
			darkMode: 'wax900',
		},
	}),
	{
		fontSize: 12,
		lineHeight: 1,
		fontWeight: 500,
	},
])
