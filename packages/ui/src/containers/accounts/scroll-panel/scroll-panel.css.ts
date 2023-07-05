import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		overflow: 'hidden',
		transition: 'slow',
	}),
	{},
	responsiveStyle({
		tablet: {
			borderRadius: vars.border.radius.xlarge,
			background: vars.color.backgroundSecondary,
			boxShadow: vars.color.shadowPanel,
		},
	}),
])
