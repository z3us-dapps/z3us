/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const assetsHeaderWrapper = style([
	sprinkles({
		position: 'sticky',
		background: 'backgroundSecondary',
		paddingX: 'xlarge',
		paddingTop: 'xlarge',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		zIndex: 1,
	}),
	{
		top: '0px',
		height: '120px',
	},
])

export const assetsHeaderUpWrapper = style([
	sprinkles({
		position: 'relative',
		pointerEvents: 'none',
		transition: 'fast',
		opacity: 0,
	}),
	{},
])

export const assetsHeaderUpVisibleWrapper = style([
	sprinkles({
		pointerEvents: 'auto',
		opacity: 1,
	}),
	{},
])

// export const accountIndexWrapper = style([
// 	sprinkles({
// 		position: 'sticky',
// 		top: 0,
// 		// zIndex: 1,
// 		display: 'flex',
// 		paddingX: {
// 			mobile: 'large',
// 			desktop: 'xlarge',
// 		},
// 		paddingTop: {
// 			mobile: 'large',
// 			desktop: 'xlarge',
// 		},
// 		transition: 'slowall',
// 	}),
// ])
