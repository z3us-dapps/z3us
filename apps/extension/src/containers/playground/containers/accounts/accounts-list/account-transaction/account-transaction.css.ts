import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const transactionWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		paddingTop: 'medium',
		paddingBottom: 'medium',
		gap: 'medium',
	}),
	{
		width: '100%',
		height: '64px',
	},
])
