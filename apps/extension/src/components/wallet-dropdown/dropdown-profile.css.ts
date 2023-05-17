import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

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
		margin: 'none',
		padding: 'none',
	}),
	{
		outline: 'none',
		background: 'transparent',
		width: '42px',
		height: '42px',
	},
])

export const dropdownProfileButtonSmall = style([
	{
		width: '32px',
		height: '32px',
		borderWidth: '2px',
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
		boxSizing: 'border-box',
		objectFit: 'cover',
		userSelect: 'none',
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

export const dropdownProfileContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		minWidth: '200px',
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	responsiveStyle({
		mobile: { minWidth: '220px' },
		tablet: { minWidth: '220px' },
	}),
])

export const dropdownProfileSimpleBarWrapper = style([
	responsiveStyle({
		mobile: { maxHeight: '460px' },
		tablet: { maxHeight: '70vh' },
	}),
])

export const dropdownProfileScrollAreaWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		height: 'full',
		paddingY: 'small',
		paddingX: 'small',
	}),
	{},
])
