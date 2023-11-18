import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const radixConnectButtonWrapper = style([
	sprinkles({
		display: 'flex',
		flexShrink: 0,
		flexGrow: 0,
		alignItems: 'center',
		position: 'relative',
	}),
	{},
])
