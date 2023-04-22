import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const accountSearchWrapperWrapperSticky = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		paddingX: 'large',
		paddingTop: 'large',
		paddingBottom: 'medium',
		background: 'backgroundSecondary',
		zIndex: 1,
		transition: 'fast',
	}),
	{
		top: '-1px',
	},
])

export const accountSearchWrapperWrapperStickyShadow = style([
	sprinkles({
		boxShadow: 'shadowScroll',
	}),
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

export const accountSearchButton = style([
	sprinkles({
		transition: 'fast',
		position: 'absolute',
		right: 0,
	}),
	{},
])

export const accountUpButton = style([
	sprinkles({
		transition: 'fast',
		position: 'absolute',
	}),
	{
		right: '32px',
	},
])

export const accountUpButtonHidden = style([
	sprinkles({
		position: 'absolute',
		opacity: 0,
		pointerEvents: 'none',
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
