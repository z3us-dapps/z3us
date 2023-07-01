import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

// import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const accountsWrapper = style([
	sprinkles({
		// height: 'vh100',
		// width: 'vw100',
		// flexDirection: 'column',
		// display: 'flex',
		height: {
			desktop: 'vh100',
		},
		maxWidth: 'full',
		width: {
			mobile: 'vw100',
			desktop: 'vw100',
		},
		flexDirection: {
			desktop: 'column',
		},
		display: {
			desktop: 'flex',
		},
		// background: 'backgroundPrimary',
	}),
	{
		border: '0px solid blue',
	},
	// responsiveStyle({
	// 	mobile: { display: 'none' },
	// 	tablet: { display: 'flex' },
	// 	desktop: { display: 'flex' },
	// }),
])

export const accountsBodyWrapper = sprinkles({
	position: 'relative',
	flexGrow: 1,
})
