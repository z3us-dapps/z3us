import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style } from '@vanilla-extract/css'

export const container = sprinkles({
	color: 'defaultColor',
	background: 'backgroundPrimary',
	position: 'relative',
	height: 'vh100',
	width: 'vw100',
	overflow: 'clip',

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
	position: 'fixed',
	bottom: 0,
	right: 0,
	zIndex: 1,
})
