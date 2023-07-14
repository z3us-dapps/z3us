/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const assetsTableWrapper = style([
	sprinkles({
		position: 'relative',
		background: 'backgroundSecondary',
		paddingX: 'xlarge',
		paddingBottom: 'xlarge',
	}),
	{},
])
