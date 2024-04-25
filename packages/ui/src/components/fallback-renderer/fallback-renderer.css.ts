import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const fallbackLoadingWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 'large',
		height: 'full',
		width: 'full',
		color: 'colorNeutral',
	}),
	{},
])

export const fallbackLoadingPreWrapper = style([
	{
		whiteSpace: 'break-spaces',
	},
])
