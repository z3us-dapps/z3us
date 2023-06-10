import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const container = sprinkles({
	background: 'backgroundSecondary',
	color: 'colorNeutral',
	position: 'relative',
	height: 'vh100',
	width: 'vw100',
	overflow: 'clip',
})
