import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const transactionIconWrapper = style([
	sprinkles({
		position: 'relative',
		flexShrink: 0,
		flexGrow: 0,
	}),
	{
		width: 'fit-content',
	},
])

export const transactionIconMediumWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '42px',
		height: '42px',
	},
])

export const transactionIconLargeWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '68px',
		height: '68px',
	},
])

export const transactionIconShadowWrapper = style([
	sprinkles({
		boxShadow: 'shadowDropdown',
	}),
	{},
])

export const transactionAvatarRootWrapper = style([
	sprinkles({
		borderRadius: 'full',
		width: 'full',
		height: 'full',
	}),
	{},
])

export const transactionAvatarImageWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		borderRadius: 'full',
	}),
	{
		objectFit: 'cover',
	},
])

export const transactionAvatarFallbackWrapper = style([
	sprinkles({
		borderRadius: 'full',
		width: 'full',
		height: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{},
])

export const transactionTypeWrapper = style([
	sprinkles({
		position: 'absolute',
		borderRadius: 'full',
		background: 'backgroundPrimary',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderStyle: 'solid',
		borderWidth: 'xxsmall',
		borderColor: 'backgroundSecondary',
		zIndex: 1,
	}),
	{
		width: '20px',
		height: '20px',
		bottom: '-4px',
		right: '-4px',
	},
])

export const transactionTypeGreen = style([
	sprinkles({
		color: 'green400',
	}),
	{},
])

export const transactionTypeRed = style([
	sprinkles({
		color: 'red400',
	}),
	{},
])

globalStyle(`${transactionTypeWrapper} svg`, {
	width: '16px',
	height: '16px',
})
