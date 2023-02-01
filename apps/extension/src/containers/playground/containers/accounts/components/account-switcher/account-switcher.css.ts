import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style } from '@vanilla-extract/css'

// .card-wrapper {
// 	position: relative;
// 	margin: 0 auto;
// 	width: 312px;
// 	height: 180px;
// }
//

export const cardWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '312px',
		height: '180px',
	},
	// responsiveStyle({
	// 	mobile: { width: '100%' },
	// 	tablet: { width: '33%' },
	// 	desktop: { width: '25%' },
	// }),
])

export const card = style([
	sprinkles({
		position: 'absolute',
	}),
	{
		width: '312px',
		height: '180px',
		borderRadius: '8px',
		transformOrigin: 'top center',
		listStyle: 'none',
	},
])

export const teststyle = style([
	sprinkles({
		position: 'relative',

		background: {
			hover: 'red800',
			focus: 'red900',
		},
	}),
	{
		border: '1px solid red',
		'@media': {
			[`screen and (min-width: 480px)`]: {
				flexBasis: '50%',
			},
		},
	},
	responsiveStyle({
		mobile: { width: '100%' },
		tablet: { width: '33%' },
		desktop: { width: '25%' },
	}),
])

export const tempNav = sprinkles({
	position: 'fixed',
	bottom: 0,
	right: 0,
	zIndex: 1,
})
