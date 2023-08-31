import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const accountsStickyWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		background: 'backgroundSecondary',
		position: 'sticky',
		top: 0,
		zIndex: 1,
		paddingX: {
			tablet: 'xlarge',
		},
		paddingTop: {
			tablet: 'xlarge',
		},
		paddingBottom: {
			tablet: 'large',
		},
	}),
	{},
])

// export const routesWrapper = style([
// 	sprinkles({
// 		position: 'relative',
// 		display: 'flex',
// 		flexDirection: 'column',
// 	}),

// 	responsiveStyle({
// 		mobile: {},
// 		tablet: {
// 			background: 'unset',
// 			minHeight: 'unset',
// 		},
// 	}),
// ])

// globalStyle(`${routesWrapper} thead`, {
// 	top: '150px !important',
// })

// export const scrollingWrapper = style([
// 	sprinkles({
// 		position: 'relative',
// 		flexGrow: 1,
// 	}),
// 	{},
// ])

// export const accountsContentWrapper = style([
// 	sprinkles({
// 		position: 'relative',
// 		paddingY: {
// 			tablet: 'xlarge',
// 		},
// 		paddingX: {
// 			tablet: 'large',
// 		},
// 	}),
// ])
