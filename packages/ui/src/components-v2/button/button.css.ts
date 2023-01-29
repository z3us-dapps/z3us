import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { sprinkles } from '../system/sprinkles.css'

export { button as buttonReset } from '../system/reset.css'

export const baseStyles = sprinkles({
	transition: 'fast',
})

export const button = recipe({
	variants: {
		styleVariant: {
			primary: sprinkles({
				background: { lightMode: 'purple500', hover: 'purple600', focus: 'purple600' },
				color: 'purple100',
			}),
			secondary: sprinkles({
				background: { lightMode: 'backgroundPrimary', hover: 'purple600', focus: 'purple600' },
				color: 'purple100',
			}),
			ghost: sprinkles({
				background: { hover: 'purple600', focus: 'purple600' },
				color: 'purple100',
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
					borderRadius: 'small',
					padding: 'small',
				}),
				{
					height: '40px',
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
	},
})

export type ButtonVariants = RecipeVariants<typeof button>
