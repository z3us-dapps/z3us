import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const indexPageWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const indexPageAppWrapper = style([
	sprinkles({
		top: 0,
		left: 0,
	}),
	{},
	responsiveStyle({
		mobile: { height: 'calc(100vh - 58px)' },
		tablet: { height: 'calc(100vh - 70px)', overflow: 'hidden' },
	}),
])

export const connectedPageWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
	responsiveStyle({
		mobile: { background: vars.color.backgroundSecondary },
		tablet: { background: vars.color.transparent },
	}),
])
