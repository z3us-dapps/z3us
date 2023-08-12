import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const layoutWrapper = sprinkles({
	background: 'backgroundPrimary',
	color: 'colorNeutral',
	position: 'relative',
	height: 'vh100',
	width: 'vw100',
	overflow: 'clip',
})

export const layoutRouteWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'vw100',
		overflow: 'clip',
	}),
	{
		height: 'calc(100vh - 71px)',
	},
])
