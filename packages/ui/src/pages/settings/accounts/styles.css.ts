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
	{},
])

export const accountsAvatarImgWrapper = style([
	sprinkles({}),
	{
		opacity: '0.5',
	},
])

export const skinSelectWrapper = style([
	sprinkles({
		display: 'flex',
		gap: 'small',
		alignItems: 'center',
		paddingBottom: 'medium',
	}),
	{},
])

export const skinClearButtonWrapper = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'flex-end',
	}),
	{},
])
