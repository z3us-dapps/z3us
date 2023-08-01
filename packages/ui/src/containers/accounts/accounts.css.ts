import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const accountsWrapper = style([
	sprinkles({
		display: 'flex',
		height: 'full',
		maxWidth: 'full',
		width: 'vw100',
		flexDirection: 'column',
	}),
	{},
	responsiveStyle({
		tablet: { background: vars.color.backgroundPrimary },
	}),
])
export const accountsBodyWrapper = style([
	sprinkles({
		position: 'relative',
		flexShrink: 0,
	}),
	{},

	responsiveStyle({
		mobile: {
			height: 'calc(100vh - 106px)',
			overflow: 'hidden',
		},
		tablet: {
			height: 'calc(100vh - 72px)',
			overflow: 'unset',
		},
	}),
])
