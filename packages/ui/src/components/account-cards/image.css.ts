import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

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
])

globalStyle(`${wrapper} img`, {
	position: 'absolute',
	width: '100%',
	height: '100%',
})
