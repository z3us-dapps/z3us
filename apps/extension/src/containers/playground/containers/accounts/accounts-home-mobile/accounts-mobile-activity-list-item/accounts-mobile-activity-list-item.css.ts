import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const mobileAccountsActivityItem = style([
	sprinkles({
		width: 'full',
		position: 'relative',
		background: 'backgroundSecondary',
		borderTop: 1,
		borderColor: 'borderDivider',
		borderStyle: 'solid',
	}),
	{
		height: '64px',
	},
])

export const mobileAccountsActivityMotionWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
	}),
])

export const mobileAccountsActivityInner = style([
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

export const mobileAccountsActivityWrapper = style([
	sprinkles({
		position: 'relative',
		height: 'full',
	}),
	{},
])

export const mobileAccountsActivityLink = style([
	sprinkles({
		width: 'full',
		height: 'full',
		transition: 'fast',
		background: {
			hover: 'btnSecondaryBackground',
		},
	}),
	{
		border: '0px solid red',
	},
])

export const mobileAccountsActivitySplit = style([
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

export const mobileAccountsIndexAssetCirclAvatar = style([
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
