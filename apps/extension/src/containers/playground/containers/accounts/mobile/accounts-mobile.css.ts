import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const mobileWrapper = style([
	sprinkles({
		height: 'vh100',
		width: 'vw100',
		display: 'flex',
		flexDirection: 'column',
		overflow: 'clip',
	}),
	{
		'@media': {
			[`screen and (min-width: 924px)`]: {
				display: 'none',
			},
		},
	},
])

export const mobileRouteWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		flexShrink: 0,
	}),
	{
		flexBasis: '0',
		minHeight: '100px',
		border: '0px solid green',
	},
])
