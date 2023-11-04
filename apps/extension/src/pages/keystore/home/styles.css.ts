import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const keystoreHomeStyleWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'xlarge',
		},
	}),
	{},
])

export const keystoreHomeButtonWrapper = style([
	sprinkles({
		display: 'flex',
		paddingTop: 'small',
		flexDirection: 'column',
		gap: 'medium',
	}),
	{},
])
