import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const keystoreOptionsWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'xlarge',
		},
	}),
	{},
])

export const keystoreOptionsTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
		paddingTop: 'small',
		paddingBottom: 'large',
	}),
	{},
])

export const keystoreOptionsButtonsWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])
