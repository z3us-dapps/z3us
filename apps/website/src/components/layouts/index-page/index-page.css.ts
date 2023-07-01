import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const indexPageWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const indexPageAppWrapper = style([
	sprinkles({
		top: 0,
		left: 0,
		overflow: {
			desktop: 'hidden',
		},
	}),
	// {
	// 	height: 'calc(100vh - 71px)',
	// },
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { width: '33%' },
		desktop: { height: 'calc(100vh - 71px)' },
	}),
])
