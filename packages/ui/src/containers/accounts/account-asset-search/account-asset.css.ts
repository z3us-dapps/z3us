import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const accountAssetWrapperWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: 'small',
		paddingBottom: 'small',
		background: 'backgroundSecondary',
		zIndex: 1,
		transition: 'fast',
	}),
	{
		minHeight: '64px',
	},
])

export const accountSearchWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		width: 'full',
	}),
	{},
])
export const accountBalanceWrapper = style([
	sprinkles({
		flexShrink: 0,
	}),
	{
		maxWidth: 'calc(100% - 72px)',
	},
])

export const accountUpButton = style([
	sprinkles({
		transition: 'fast',
		position: 'absolute',
		opacity: 0,
		pointerEvents: 'none',
	}),
	{
		right: '38px',
	},
])

export const accountUpButtonVisible = style([
	sprinkles({
		opacity: 1,
		pointerEvents: 'auto',
	}),
])

export const accountSearchButton = style([
	sprinkles({
		transition: 'fast',
		position: 'absolute',
		right: 0,
	}),
	{},
])
