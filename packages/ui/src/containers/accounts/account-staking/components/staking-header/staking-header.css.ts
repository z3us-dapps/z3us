/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const stakingHeaderWrapper = style([
	sprinkles({
		position: 'sticky',
		background: 'backgroundSecondary',
		paddingX: 'xlarge',
		paddingTop: 'xlarge',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		zIndex: 1,
	}),
	{
		top: '0px',
		height: '138px',
	},
])
