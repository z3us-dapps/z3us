import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

export const accountHeadShadow = style([
	sprinkles({
		position: 'sticky',
		height: 'xlarge',
		transition: 'fast',
		pointerEvents: 'none',
		zIndex: 1,
		display: {
			mobile: 'none',
			tablet: 'block',
		},
	}),
	{
		height: '0px',
		'::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			height: '24px',
			transform: 'translateY(-24px)',
			pointerEvents: 'none',
			background: 'transparent',
			opacity: 1,
			transition: vars.transition.fast,
			boxShadow: '0px 10px 11px -7px rgba(0, 0, 0, 0.4)',
		},
	},
])
