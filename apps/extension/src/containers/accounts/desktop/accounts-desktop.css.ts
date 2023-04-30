import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const desktopWrapper = style([
	sprinkles({
		height: 'vh100',
		width: 'vw100',
		flexDirection: 'column',
		display: 'none',
		background: 'backgroundPrimary',
	}),
	responsiveStyle({
		mobile: { display: 'none' },
		tablet: { display: 'flex' },
		desktop: { display: 'flex' },
	}),
])

export const desktopBody = sprinkles({
	position: 'relative',
	flexGrow: 1,
})
