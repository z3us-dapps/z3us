import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { style } from '@vanilla-extract/css'

export const dropdownProfilWrapper = sprinkles({
	display: 'flex',
	position: 'relative',
})

export const dropdownProfileButton = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		borderRadius: 'full',
		borderStyle: 'solid',
		borderWidth: 'xsmall',
		transition: 'fast',
		cursor: 'pointer',
		borderColor: {
			lightMode: 'borderDivider',
			hover: 'purple600',
		},
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		outline: 'none',
		width: '42px',
		height: '42px',
	},
])

export const dropdownProfilAvatar = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		borderRadius: 'full',
		width: 'full',
		height: 'full',
	}),
	{},
])

export const dropdownProfilAvatarImg = style([
	sprinkles({
		width: 'full',
		height: 'full',
		border: 1,
		borderStyle: 'solid',
		borderColor: 'backgroundSecondary',
		borderRadius: 'full',
	}),
	{
		objectFit: 'cover',
		userSelect: 'none',
		borderRadius: 'inherit',
	},
])

export const dropdownProfilAvatarFallback = style([
	sprinkles({
		width: 'full',
		height: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: {
			lightMode: 'wax200',
			darkMode: 'wax900',
		},
		borderRadius: 'full',
	}),
])

export const dropdownProfilAvatarConnectedStatus = style([
	sprinkles({
		borderRadius: 'full',
		position: 'absolute',
		borderColor: 'backgroundPrimary',
		borderStyle: 'solid',
		background: { lightMode: 'green500', darkMode: 'green500' },
		width: 'medium',
		height: 'medium',
	}),
	{
		borderWidth: '2px',
		bottom: '-0.0rem',
		left: '-0.0rem',
	},
])
