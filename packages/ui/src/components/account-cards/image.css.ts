import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const wrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		display: 'flex',
		justifyContent: 'center',
		width: 'full',
		height: 'full',
		maxWidth: 'full',
		pointerEvents: 'none',
	}),
	responsiveStyle({
		mobile: { maxHeight: '376px' },
		tablet: { maxHeight: 'unset' },
	}),
])

export const wrapperImg = style([
	sprinkles({
		position: 'absolute',
		width: 'full',
		height: 'full',
	}),
])
