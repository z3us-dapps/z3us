import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style } from '@vanilla-extract/css'

export const container = sprinkles({
	color: 'defaultColor',
	background: 'background',
	position: 'relative',
	height: 'vh100',
	width: 'vw100',
	overflow: 'clip',

	// Conditional sprinkles:
	//
	// flexDirection: {
	// 	mobile: 'column',
	// 	desktop: 'row',
	// },

	// background: {
	// 	lightMode: 'teal50',
	// 	darkMode: 'stone50',
	// },
})

export const teststyle = style([
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
	background: 'background',
	position: 'fixed',
	bottom: 0,
	right: 0,
	zIndex: 1,
})

// .z3-c-app {
// 	position: relative;
// 	font-family: var(--font-family-inter);
// 	background: var(--color-background-primary);
// 	color: var(--color-font-primary);
// 	height: 100vh;
// 	width: 100vw;
// 	overflow: clip;
//
// 	> div {
// 		position: absolute;
// 		top: 0;
// 		left: 0;
// 		height: 100vh;
// 		width: 100vw;
// 	}
// }
//
