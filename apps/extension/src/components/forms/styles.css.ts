import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const modalContentFormButtonWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		paddingTop: 'medium',
	}),
	{},
])
