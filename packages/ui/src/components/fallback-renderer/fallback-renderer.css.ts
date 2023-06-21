import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const fallbackRendererWrapper = style([
	sprinkles({
		position: 'relative',
		padding: 'small',
		borderRadius: 'medium',
		background: {
			lightMode: 'bai_pearl200',
			darkMode: 'backgroundSecondary',
		},
		boxShadow: 'shadowTooltip',
	}),
	{},
])
