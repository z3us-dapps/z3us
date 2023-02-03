import { sprinkles, darkMode } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { style } from '@vanilla-extract/css'

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
		borderRadius: 'xlarge',
	}),
	{
		width: '312px',
		height: '180px',
		transformOrigin: 'top center',
		listStyle: 'none',
		boxShadow:
			'0px 136px 192px rgba(0, 0, 0, 0.3), 0px 50px 50px rgba(0, 0, 0, 0.25), 0px 24px 24px rgba(0, 0, 0, 0.2), 0px 12px 12px rgba(0, 0, 0, 0.15)',

		selectors: {
			[`.${darkMode} &`]: {
				boxShadow:
					'0px 136px 192px rgba(0, 0, 0, 0.3), 0px 50px 50px rgba(0, 0, 0, 0.25), 0px 24px 24px rgba(0, 0, 0, 0.2), 0px 12px 12px rgba(0, 0, 0, 0.15)',
			},
		},
	},
])

export const cardAccount = style([
	sprinkles({
		position: 'relative',
	}),
	{
		letterSpacing: '0.15em',
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