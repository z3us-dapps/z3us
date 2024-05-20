import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const containerWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		justifyContent: 'center',
		paddingX: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xxlarge',
		},
	}),
	responsiveStyle({
		mobile: {
			maxHeight: 'calc(100vh - 95px)',
		},
		tablet: {
			maxHeight: 'unset',
		},
	}),
])

export const containerInnerWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		maxWidth: '1344px',
	}),
])
