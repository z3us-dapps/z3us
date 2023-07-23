import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const accountRoutesScrollingStickySheet = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		display: {
			mobile: 'block',
			tablet: 'none',
		},
	}),
	{
		height: '0px',
	},
])

export const accountRoutesScrollingStickyInnerSheet = style([
	sprinkles({
		position: 'absolute',
		left: 0,
		right: 0,
		pointerEvents: 'none',
		background: 'backgroundSecondary',
	}),
	{
		borderTopLeftRadius: vars.border.radius.xxxlarge,
		borderTopRightRadius: vars.border.radius.xxxlarge,
	},
])
