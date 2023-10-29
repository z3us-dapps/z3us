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

export const keystoreHomeTextWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		flexDirection: 'column',
		gap: {
			mobile: 'xsmall',
		},
	}),
	{},
])

export const keystoreHomeButtonWrapper = style([
	sprinkles({
		display: 'flex',
		paddingTop: 'xlarge',
		flexDirection: 'column',
		gap: 'medium',
	}),
	{},
])
