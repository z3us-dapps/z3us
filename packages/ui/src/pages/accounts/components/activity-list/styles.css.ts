import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const sideBarWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
		paddingTop: 'small',
		paddingBottom: 'xsmall',
	}),
	{},
	responsiveStyle({
		tablet: { height: 'auto', position: 'relative' },
	}),
])
