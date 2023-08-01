import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const accountsWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
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
		flexGrow: 1,
		flexShrink: 0,
	}),
])
