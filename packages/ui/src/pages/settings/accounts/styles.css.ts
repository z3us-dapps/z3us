import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const accountsCardWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		gap: 'large',
	}),
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
])

export const skinClearButtonWrapper = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'flex-end',
	}),
])

export const cardWrapper = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'xlarge',
		overflow: 'hidden',
	}),
	{
		aspectRatio: '8 / 5',
	},
	responsiveStyle({
		mobile: {
			width: '100%',
		},
		desktop: {
			width: '100%',
		},
	}),
])
