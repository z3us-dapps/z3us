/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const accountBreadCrumbWrapper = style([
	sprinkles({
		display: 'flex',
		background: 'backgroundSecondary',
		position: 'sticky',
		top: 0,
		flexGrow: 0,
		alignItems: 'center',
		zIndex: 1,
		paddingX: {
			tablet: 'xlarge',
		},
	}),
	{
		height: '68px',
	},
])
