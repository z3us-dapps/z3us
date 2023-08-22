import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const radixConnectButtonWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
	}),
	{},
])
