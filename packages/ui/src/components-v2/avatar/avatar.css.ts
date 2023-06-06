import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'

export const avatarRootWrapper = style([
	sprinkles({
		flexShrink: 0,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'clip',
		borderRadius: 'full',
	}),
	{
		userSelect: 'none',
	},
])

export const avatarRootRecipe = recipe({
	variants: {
		styleVariant: {
			neutral: [
				sprinkles({
					background: {
						lightMode: 'bleached_silk500',
						darkMode: 'wax900',
					},
				}),
				{},
			],
			border: [sprinkles({}), {}],
		},
		sizeVariant: {
			small: {},
			medium: [
				sprinkles({
					borderRadius: 'full',
				}),
				{
					height: '32px',
					width: '32px',
				},
			],
			large: {},
		},
	},
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
			neutral: {},
			border: [sprinkles({}), {}],
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
			neutral: {},
			border: [sprinkles({}), {}],
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
