import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

export const switchRootWrapper = style([
	sprinkles({
		display: 'inline-flex',
		alignItems: 'center',
		borderRadius: 'full',
		border: 0,
		transition: 'fastall',
		cursor: 'pointer',
	}),
	{
		outline: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
	},
])

export const switchRecipe = recipe({
	base: {
		margin: 0,
		padding: 0,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					background: 'lead400',
					borderColor: 'lead300',
				}),
				{
					borderWidth: '1px',
					borderStyle: 'solid',
					'&[data-state="checked"]': {
						background: `${vars.color.purple500}`,
						borderColor: `${vars.color.purple400}`,
					},
				},
			],
			secondary: [
				sprinkles({
					background: 'orange600',
					color: 'colorStrong',
				}),
			],
		},
		sizeVariant: {
			small: {},
			medium: [
				sprinkles({}),
				{
					width: '42px',
					height: '25px',
				},
			],
			large: {},
		},
	},
	compoundVariants: [
		{
			// TODO
			variants: {
				styleVariant: 'primary',
				sizeVariant: 'large',
			},
			style: {
				background: 'ghostwhite',
			},
		},
	],
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
	},
})

export const switchThumbRoot = style([
	sprinkles({
		display: 'block',
		borderRadius: 'full',
		transition: 'fastall',
		cursor: 'pointer',
	}),
])

export const switchThumbRecipe = recipe({
	base: {
		transform: 'translateX(2px)',
		willChange: 'transform',
	},
	variants: {
		styleVariant: {
			primary: [
				sprinkles({
					background: 'white',
				}),
			],
			secondary: [
				sprinkles({
					background: 'orange600',
				}),
			],
		},
		sizeVariant: {
			small: {},
			medium: [
				sprinkles({}),
				{
					width: '21px',
					height: '21px',
					'&[data-state="checked"]': {
						transform: 'translateX(18px)',
					},
				},
			],
			large: {},
		},
	},
	compoundVariants: [
		{
			// TODO
			variants: {
				styleVariant: 'primary',
				sizeVariant: 'large',
			},
			style: {
				background: 'ghostwhite',
			},
		},
	],
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
	},
})
