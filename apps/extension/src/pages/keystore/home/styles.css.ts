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

export const keystoreHomeLogoWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		justifyContent: 'center',
		paddingBottom: {
			mobile: 'xlarge',
		},
	}),
	{},
])

export const keystoreHomeButtonWrapper = style([
	sprinkles({
		display: 'flex',
		paddingTop: 'large',
		flexDirection: 'column',
		gap: 'medium',
	}),
	{},
])
