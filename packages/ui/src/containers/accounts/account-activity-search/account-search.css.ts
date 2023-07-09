import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const accountSearchWrapperWrapperSticky = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		display: {
			mobile: 'none',
			tablet: 'block',
		},
		paddingX: {
			mobile: 'large',
			tablet: 'large',
		},
		paddingTop: {
			mobile: 'medium',
			tablet: 'medium',
		},
		paddingBottom: {
			mobile: 'small',
			tablet: 'medium',
		},
		background: 'backgroundSecondary',
		zIndex: 1,
		transition: 'fast',
	}),
	{
		top: '-1px',
	},
])

export const accountSearchBorderWrapper = style([
	sprinkles({
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
])

export const accountSearchWrapperWrapperStickyShadow = style([
	sprinkles({
		boxShadow: 'shadowScrollTop',
	}),
])

export const accountSearchWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 'full',
	}),
	{},
])

export const accountSearchTextWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		maxWidth: '280px',
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

export const accountUpButton = style([
	sprinkles({
		transition: 'fast',
		position: 'absolute',
	}),
	{
		right: '36px',
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
