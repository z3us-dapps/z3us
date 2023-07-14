/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const assetsHeaderWrapper = style([
	sprinkles({
		position: 'sticky',
		background: 'backgroundSecondary',
		padding: 'xlarge',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		zIndex: 1,
	}),
	{
		top: '1px',
	},
])

export const accountIndexWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		// zIndex: 1,
		display: 'flex',
		paddingX: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		paddingTop: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		transition: 'slowall',
	}),
])
