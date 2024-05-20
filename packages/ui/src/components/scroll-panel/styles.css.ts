import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const scrollWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{
		'::before': {
			borderTopLeftRadius: vars.border.radius.xxlarge,
			borderTopRightRadius: vars.border.radius.xxlarge,
			left: '3px',
			right: '3px',
		},
		'::after': {
			borderBottomLeftRadius: vars.border.radius.xxlarge,
			borderBottomRightRadius: vars.border.radius.xxlarge,
			left: '3px',
			right: '3px',
		},
	},
	responsiveStyle({
		tablet: {
			maxHeight: 'calc(100vh - 112px)',
			borderRadius: vars.border.radius.xlarge,
			background: vars.color.backgroundSecondary,
			boxShadow: vars.color.shadowPanel,
		},
		desktop: {
			maxHeight: 'calc(100vh - 142px)',
		},
	}),
])
