/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		maxWidth: 'medium',
		width: 'full',
		paddingTop: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
	}),
	{},
])
