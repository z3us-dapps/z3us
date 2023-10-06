import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const fallbackRendererWrapper = style([
	sprinkles({
		position: 'relative',
		padding: 'large',
		borderRadius: 'medium',
		background: {
			lightMode: 'bai_pearl200',
			darkMode: 'backgroundSecondary',
		},
		boxShadow: 'shadowTooltip',
	}),
	{},
])

export const fallbackLoadingWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		placeItems: 'center',
		padding: 'small',
		borderRadius: 'medium',
		height: 'full',
		width: 'full',
	}),
	{},
])
