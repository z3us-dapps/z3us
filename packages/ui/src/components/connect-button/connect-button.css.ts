import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const radixConnectButtonWrapper = style([
	sprinkles({
		display: 'block',
		position: 'relative',
	}),
	{
		width: '138px',
	},
])
