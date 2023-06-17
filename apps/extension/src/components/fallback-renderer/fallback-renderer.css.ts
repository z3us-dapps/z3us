import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const chartTooltipWrapper = style([
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

export const chartTooltipColorCircle = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		boxShadow: 'shadowTooltip',
	}),
	{
		background: '#a7674a',
		width: '6px',
		height: '6px',
	},
])