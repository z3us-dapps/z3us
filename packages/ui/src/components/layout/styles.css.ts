import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const layoutWrapper = style([
	sprinkles({
		color: 'colorNeutral',
		position: 'relative',
		height: 'vh100',
		width: 'vw100',
		overflow: 'clip',
	}),
	{},
	responsiveStyle({
		mobile: { background: vars.color.backgroundSecondary },
		tablet: { background: vars.color.backgroundPrimary },
	}),
])

export const layoutRouteWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'vw100',
	}),
	{},
	responsiveStyle({
		mobile: {
			height: 'calc(100vh - 106px)',
		},
		tablet: { overflow: 'clip', height: '100%' },
	}),
])
