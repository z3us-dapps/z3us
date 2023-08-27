import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const stakingHeaderWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		padding: 'xlarge',
		background: 'backgroundSecondary',
		zIndex: 1,
	}),
	responsiveStyle({
		// mobile: { height: '48px' },
		tablet: { height: '120px' },
	}),
])
