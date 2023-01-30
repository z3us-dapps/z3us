import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { sprinkles } from '../system/sprinkles.css'

export { button as buttonReset } from '../system/reset.css'

export const baseSprinkles = sprinkles({
	transition: 'fast',
})

export const button = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	variants: {
		styleVariant: {
			primary: sprinkles({
				background: { lightMode: 'purple500', hover: 'purple600', focus: 'purple600' },
				color: 'purple100',
			}),
			secondary: sprinkles({
				background: { lightMode: 'btnSecondaryBackground', hover: 'btnSecondaryBackgroundHover' },
				borderColor: { lightMode: 'btnSecondaryBorderColor', hover: 'btnSecondaryBorderColorHover' },
				color: 'colorNeutral',
				border: 1,
				borderStyle: 'solid',
			}),
			ghost: sprinkles({
				background: { hover: 'backgroundPrimary', focus: 'purple600' },
				borderColor: { lightMode: 'btnGhostBorderColor', hover: 'btnGhostBorderColorHover' },
				color: 'colorNeutral',
				border: 1,
				borderStyle: 'solid',
			}),
		},
		sizeVariant: {
			small: [
				sprinkles({
					borderRadius: 'small',
					padding: 'small',
				}),
				{
					height: '32px',
				},
			],
			medium: [
				sprinkles({
					borderRadius: 'medium',
				}),
				{
					height: '40px',
					fontSize: '14px',
					lineHeight: '14px',
					paddingLeft: '18px',
					paddingRight: '18px',
					gap: '10px',
				},
			],
			large: [
				sprinkles({
					borderRadius: 'large',
					padding: 'medium',
				}),
				{
					height: '48px',
				},
			],
		},
		iconOnly: {
			true: {},
		},
	},
	compoundVariants: [
		{
			variants: {
				sizeVariant: 'medium',
				iconOnly: true,
			},
			style: {
				width: '40px',
				padding: '0px',
			},
		},
	],
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
	},
})

export type ButtonVariants = RecipeVariants<typeof button>
