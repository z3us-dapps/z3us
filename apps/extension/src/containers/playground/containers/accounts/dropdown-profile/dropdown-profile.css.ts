import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { style } from '@vanilla-extract/css'

export const dropdownProfilWrapper = sprinkles({
	display: 'flex',
	position: 'relative',
})

export const dropdownProfilAvatar = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		borderRadius: 'full',
	}),
	{
		width: '25px',
		height: '25px',
	},
])

export const dropdownProfilAvatarImg = style([
	sprinkles({
		width: 'full',
		height: 'full',
		border: 1,
		borderStyle: 'solid',
		borderColor: 'backgroundSecondary',
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
		borderColor: 'backgroundPrimary',
		borderStyle: 'solid',
		background: { lightMode: 'green500', darkMode: 'green500' },
	}),
	{
		borderWidth: '2px',
		bottom: '-0.1rem',
		left: '-0.1rem',
		width: '0.7rem',
		height: '0.7rem',
	},
])
