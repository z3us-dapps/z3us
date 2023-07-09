import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const accountsWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		height: 'full',
		maxWidth: 'full',
		width: 'vw100',
		flexDirection: 'column',
		// background: {
		// 	mobile: 'backgroundPrimary',
		// },
		// background: {
		// 	tablet: 'backgroundPrimary',
		// },
	}),
	{},

	responsiveStyle({
		tablet: { background: 'backgroundPrimary' },
	}),
])

export const accountsBodyWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
		flexShrink: 0,
	}),
	{
		// border: '1px solid blue',
		// height: '50%',
		// overflow: 'hidden',
	},
	// responsiveStyle({
	// 	mobile: { display: 'none' },
	// 	tablet: { display: 'flex' },
	// 	desktop: { display: 'flex' },
	// }),
])
