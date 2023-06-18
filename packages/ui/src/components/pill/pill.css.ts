import { style } from '@vanilla-extract/css'

import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'

export const pillRootWrapper = style([
	sprinkles({
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{},
])

export const pillRecipe = recipe({
	base: {
		margin: 0,
		padding: 0,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	variants: {
		styleVariant: {
			neutral: { background: 'whitesmoke' },
			caution: [
				sprinkles({
					background: 'orange600',
					color: 'colorStrong',
				}),
				{},
			],
		},
		sizeVariant: {
			small: {},
			medium: [
				sprinkles({
					borderRadius: 'xlarge',
					paddingX: 'small',
					paddingY: 'small',
				}),
				{
					height: '26px',
					fontSize: '13px',
					lineHeight: '13px',
					paddingLeft: '8px',
					paddingRight: '8px',
				},
			],
			large: {},
		},
	},

	// Applied when multiple variants are set at once
	compoundVariants: [
		{
			variants: {
				styleVariant: 'neutral',
				sizeVariant: 'large',
			},
			style: {
				background: 'ghostwhite',
			},
		},
	],

	defaultVariants: {
		styleVariant: 'neutral',
		sizeVariant: 'medium',
	},
})
