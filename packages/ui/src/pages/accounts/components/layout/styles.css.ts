import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const accountsStickyWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		flexDirection: 'column',
		gap: 'small',
		background: 'backgroundSecondary',
		position: 'sticky',
		top: 0,
		zIndex: 1,
		paddingX: {
			tablet: 'xlarge',
		},
		paddingTop: {
			tablet: 'xlarge',
		},
		paddingBottom: {
			tablet: 'large',
		},
	}),
	{},
])
