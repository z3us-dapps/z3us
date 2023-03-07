import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

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
		borderWidth: 'xxsmall',
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

export const dropdownProfileButtonSmall = style([
	sprinkles({}),
	{
		width: '28px',
		height: '28px',
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
			lightMode: 'bleached_silk600',
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
	}),
	{
		width: '12px',
		height: '12px',
		borderWidth: '2px',
		bottom: '-0.0rem',
		left: '-0.0rem',
	},
])

export const dropdownProfilAvatarConnectedStatusSmall = style([
	{
		width: '10px',
		height: '10px',
		borderWidth: '2px',
		bottom: '-0.0rem',
		left: '-0.0rem',
	},
])
