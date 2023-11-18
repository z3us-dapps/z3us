import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const copiedAnimationWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		height: '24px',
		width: '24px',
	},
])
