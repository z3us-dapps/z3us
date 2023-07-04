import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const accountIndexWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		zIndex: 1,
		display: 'flex',
		paddingX: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		paddingTop: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		transition: 'slowall',
	}),
])
