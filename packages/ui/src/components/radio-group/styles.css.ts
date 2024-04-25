import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const radioGroupWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		gap: 'small',
		cursor: 'pointer',
	}),
	{},
])

export const radioGroupItemWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		textAlign: 'left',
		borderRadius: 'full',
		background: 'backgroundPrimary',
		flexShrink: 0,
	}),
	{
		width: '25px',
		height: '25px',
		border: 'none',
		outline: 'none',
	},
])

export const radioGroupIndicationWrapper = style([
	sprinkles({
		width: 'full',
		display: 'block',
		position: 'relative',
		borderRadius: 'full',
		background: 'purple400',
	}),
	{
		width: '15px',
		height: '15px',
		border: 'none',
		outline: 'none',
	},
])
