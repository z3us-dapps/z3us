import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const fallbackLoadingWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		placeItems: 'center',
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
