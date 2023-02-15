import { style } from '@vanilla-extract/css'
import { sprinkles } from '../system/sprinkles.css'

// TODO: fix up sprinkles
export const avatarRoot = style([
	sprinkles({
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'full',
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
	sprinkles({}),
	{
		objectFit: 'cover',
		borderRadius: 'inherit',
		width: '100%',
		height: '100%',
	},
])

export const avatarFallback = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		width: 'full',
		height: 'full',
	}),
	{
		backgroundColor: 'white',
		color: 'grey',
		fontSize: 12,
		lineHeight: 1,
		fontWeight: 500,
	},
])
