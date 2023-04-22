import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const accountAssetWrapperWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: 'medium',
		paddingBottom: 'small',
		background: 'backgroundSecondary',
		zIndex: 1,
		transition: 'fast',
	}),
	{
		minHeight: '70px',
	},
])

export const accountSearchWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'flex-end',
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
		maxWidth: 'calc(100% - 32px)',
	},
])

export const accountSearchButton = style([
	sprinkles({
		transition: 'fast',
		position: 'absolute',
		right: 0,
	}),
	{},
])

export const accountCloseSearchButton = style([
	sprinkles({
		position: 'absolute',
		right: 0,
		transition: 'fast',
	}),
	{
		right: vars.spacing.xsmall,
	},
])

export const accountSearchButtonHidden = style([
	sprinkles({
		position: 'absolute',
		opacity: 0,
		pointerEvents: 'none',
	}),
	{},
])

export const inputWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		transition: 'fast',
		width: 'full',
		opacity: 0,
	}),
	{},
])

export const inputWrapperVisible = style([sprinkles({}), { opacity: 1 }])

export const inputElement = style([
	sprinkles({
		width: 'full',
	}),
	{},
])
