import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const mobileAccountsIndex = style([
	sprinkles({
		width: 'full',
		position: 'relative',
		background: 'backgroundSecondary',
		borderTop: 1,
		borderTopStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{
		height: '94px',
	},
])

export const mobileAccountsIndexMotionWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
	}),
])

export const mobileAccountsIndexInner = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		height: 'full',
		display: 'flex',
		flexDirection: 'column',
		paddingX: 'medium',
		paddingY: 'medium',
	}),
	{},
])

export const mobileAccountsIndexWrapper = style([
	sprinkles({
		position: 'relative',
		height: 'full',
	}),
	{},
])

export const mobileAccountsIndexLink = style([
	sprinkles({
		width: 'full',
		height: 'full',
		transition: 'fast',
		background: {
			hover: 'btnSecondaryBackground',
		},
	}),
])

export const mobileAccountsIndexSplit = style([
	sprinkles({}),
	{
		width: '50%',
	},
])

export const mobileAccountsIndexAssetCircle = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		pointerEvents: 'auto',
		borderColor: 'backgroundSecondary',
		borderStyle: 'solid',
		borderWidth: 'xsmall',
		transition: 'fast',
	}),
	{
		width: '34px',
		height: '34px',
		marginLeft: '-7px',
		selectors: {
			'&:hover': {
				borderColor: vars.color.purple500,
			},
		},
	},
])

export const mobileAccountsIndexAbsoluteAssetsWrapper = style([
	sprinkles({
		position: 'absolute',
		marginLeft: 'medium',
		display: 'flex',
		alignItems: 'center',
	}),
	{
		top: '44px',
	},
])

globalStyle(`${mobileAccountsIndexAbsoluteAssetsWrapper} > ${mobileAccountsIndexAssetCircle}:first-child`, {
	marginLeft: '0px',
})

export const mobileAccountsIndexAssetSquare = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'xsmall',
		pointerEvents: 'auto',
		borderColor: 'backgroundSecondary',
		borderStyle: 'solid',
		borderWidth: 'xsmall',
		transition: 'fast',
		overflow: 'clip',
	}),
	{
		width: '34px',
		height: '34px',
		selectors: {
			'&:hover': {
				borderColor: vars.color.purple500,
			},
		},
	},
])

export const mobileAccountsIndexAssetSquareAvatar = style([
	sprinkles({
		position: 'relative',
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{
		userSelect: 'none',
		overflow: 'clip',
		width: '34px',
		height: '34px',
		maxHeight: '100%',
		maxWidth: '100%',
	},
])

export const mobileAccountsIndexAssetCircleAvatar = style([
	sprinkles({
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'full',
	}),
	{
		userSelect: 'none',
		overflow: 'clip',
		width: 48,
		height: 48,
		maxHeight: '100%',
		maxWidth: '100%',
	},
])

export const mobileAccountsIndexAssetAvatarImage = style([
	sprinkles({
		width: 'full',
		height: 'full',
	}),
	{
		objectFit: 'cover',
	},
])

export const mobileAccountsIndexAssetAvatarFallback = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
		height: 'full',
		background: {
			lightMode: 'bleached_silk500',
			darkMode: 'wax900',
		},
	}),
])
