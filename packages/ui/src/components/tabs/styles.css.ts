import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'
import { vars } from '../system/theme.css'

export const tabsListRootWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		zIndex: 1,
		position: 'relative',
	}),
	{},
])

export const tabsListRecipe = recipe({
	base: {
		margin: 0,
		padding: 0,
	},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					width: 'full',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					background: {
						lightMode: 'bleached_silk400',
						darkMode: 'lead400',
					},
					borderColor: {
						lightMode: 'bleached_silk500',
						darkMode: 'lead300',
					},
				}),
				{
					borderWidth: '1px',
					borderStyle: 'solid',
				},
			],
			secondary: [sprinkles({}), {}],
		},
		sizeVariant: {
			small: {},
			medium: [sprinkles({}), {}],
			large: {},
		},
	},
	compoundVariants: [
		{
			variants: {
				styleVariant: 'primary',
				sizeVariant: 'medium',
			},
			style: {
				borderRadius: vars.border.radius.large,
				padding: vars.spacing.xsmall,
			},
		},
	],
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
	},
})

export const tabsTriggerRoot = style([
	sprinkles({
		display: 'block',
		transition: 'fastall',
		cursor: 'pointer',
		border: 0,
	}),
	{ outline: 'none' },
])

export const tabsTriggerRecipe = recipe({
	base: {},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					background: 'transparent',
					flexGrow: 1,
					flexShrink: 0,
				}),
				{
					width: 'auto',
					'&[data-state="active"]': {
						background: vars.color.backgroundSecondary,
					},
				},
			],
			secondary: [
				sprinkles({
					background: 'orange600',
				}),
				{},
			],
		},
		sizeVariant: {
			small: {},
			medium: [sprinkles({}), {}],
			large: {},
		},
	},
	compoundVariants: [
		{
			variants: {
				styleVariant: 'primary',
				sizeVariant: 'medium',
			},
			style: {
				padding: vars.spacing.small,
				borderRadius: vars.spacing.small,
				fontSize: '14px',
				fontWeight: '500px',
			},
		},
	],
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
	},
})
