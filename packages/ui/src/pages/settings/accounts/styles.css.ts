import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const accountsCardWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		gap: 'large',
	}),
	{
		maxWidth: '340px',
		maxHeight: '190px',
	},
])

export const accountsAvatarImgWrapper = style([
	sprinkles({}),
	{
		opacity: '0.5',
	},
])
