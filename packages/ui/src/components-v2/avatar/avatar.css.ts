import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'
import { vars } from '../system/theme.css'

export const avatarRootWrapper = style([
	sprinkles({
		flexShrink: 0,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'clip',
	}),
	{
		userSelect: 'none',
	},
])

export const avatarRootRecipe = recipe({
	variants: {
		styleVariant: {
			circle: [
				sprinkles({
					background: {
						lightMode: 'bleached_silk500',
						darkMode: 'wax900',
					},
					borderRadius: 'full',
				}),
				{},
			],
			rounded: [sprinkles({}), {}],
			square: [
				sprinkles({}),
				{
					borderRadius: 'inherit',
				},
			],
		},
		sizeVariant: {
			small: [
				sprinkles({}),
				{
					height: '32px',
					width: '32px',
				},
			],
			medium: [
				sprinkles({}),
				{
					height: '40px',
					width: '40px',
				},
			],
			large: {},
		},
	},
	compoundVariants: [
		{
			variants: {
				styleVariant: 'rounded',
				sizeVariant: 'medium',
			},
			style: {
				borderRadius: vars.border.radius.medium,
			},
		},
	],
})

export const avatarImageWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
	}),
	{
		objectFit: 'cover',
		borderRadius: 'inherit',
	},
])

export const avatarImageRecipe = recipe({
	variants: {
		styleVariant: {
			circle: {},
			rounded: [sprinkles({}), {}],
			square: [sprinkles({}), {}],
		},
		sizeVariant: {
			small: {},
			medium: [sprinkles({}), {}],
			large: {},
		},
	},
})

export const avatarFallbackWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
		height: 'full',
	}),
	{
		textTransform: 'uppercase',
	},
])

export const avatarFallbackRecipe = recipe({
	variants: {
		styleVariant: {
			circle: {},
			rounded: [sprinkles({}), {}],
			square: {},
		},
		sizeVariant: {
			small: {
				fontSize: '12px',
				lineHeight: '12px',
			},
			medium: [
				sprinkles({}),
				{
					fontSize: '12px',
					lineHeight: '12px',
				},
			],
			large: {},
		},
	},
})
