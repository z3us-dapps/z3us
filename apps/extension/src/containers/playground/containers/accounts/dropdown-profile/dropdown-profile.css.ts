import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { style } from '@vanilla-extract/css'

export const dropdownProfilWrapper = sprinkles({
	display: 'flex',
	position: 'relative',
})

export const dropdownProfilAvatar = sprinkles({
	display: 'flex',
	position: 'relative',
	alignItems: 'center',
	borderRadius: 'full',
	width: 'xxlarge',
	height: 'xxlarge',
})

export const dropdownProfilAvatarImg = style([
	sprinkles({
		width: 'full',
		height: 'full',
	}),
	{
		objectFit: 'cover',
		borderRadius: 'inherit',
	},
])

export const dropdownProfilAvatarFallback = style([
	sprinkles({
		width: 'full',
		height: 'full',
		display: 'flex',
		alignItems: 'center',
		background: 'white',
	}),
])

export const dropdownProfilAvatarConnectedStatus = style([
	sprinkles({
		borderRadius: 'full',
		position: 'absolute',
	}),
	{
		bottom: '-0.2rem',
		left: '-0.3rem',
		width: '0.7rem',
		height: '0.7rem',
		border: '2px solid',
		borderColor: 'white',
		backgroundColor: '#15920a',
	},
])
