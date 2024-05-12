import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const radixConnectButtonWrapper = style([
	sprinkles({
		display: 'flex',
		flexShrink: 0,
		flexGrow: 0,
		alignItems: 'center',
		position: 'relative',
	}),
])
