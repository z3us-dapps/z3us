import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const pairingWrapper = style([
	sprinkles({
		position: 'relative',
		padding: {
			mobile: 'xlarge',
		},
	}),
	{},
])

export const pairingTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
		paddingTop: 'small',
		paddingBottom: 'large',
	}),
	{},
])

export const pairingQrWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		paddingTop: 'small',
		paddingBottom: 'large',
	}),
	{},
])

export const pairingLinkWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		width: 'full',
	}),
	{},
])
