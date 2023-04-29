import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const mobileWrapper = style([
	sprinkles({
		height: 'vh100',
		width: 'vw100',
		display: 'flex',
		flexDirection: 'column',
		overflow: 'clip',
	}),
	{
		// '@media': {
		// 	[`screen and (min-width: 924px)`]: {
		// 		display: 'none',
		// 	},
		// },
	},
	responsiveStyle({
		mobile: { display: 'flex' },
		tablet: { display: 'none' },
		desktop: { display: 'none' },
	}),
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
	},
])
