import { recipe, RecipeVariants } from '@vanilla-extract/recipes'
import { sprinkles } from '../system/sprinkles.css'

export const baseSprinkles = sprinkles({
	transition: 'fast',
})

export const button = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		outline: 'none',
	},
	variants: {
		styleVariant: {
			primary: sprinkles({
				background: {
					lightMode: 'inputPrimaryBackground',
					hover: 'inputPrimaryBackgroundHover',
					focus: 'inputPrimaryBackgroundFocus',
					focusVisible: 'inputPrimaryBackgroundFocus',
				},
				borderColor: {
					lightMode: 'inputPrimaryBorderColor',
					hover: 'inputPrimaryBorderHover',
					focus: 'inputPrimaryBorderFocus',
					focusVisible: 'inputPrimaryBorderFocus',
				},
				boxShadow: {
					focus: 'inputPrimaryShadowFocus',
					focusVisible: 'inputPrimaryShadowFocus',
				},
				color: 'colorStrong',
				border: 1,
				borderStyle: 'solid',
			}),
			secondary: sprinkles({
				background: { lightMode: 'btnSecondaryBackground', hover: 'btnSecondaryBackgroundHover' },
				borderColor: { lightMode: 'btnSecondaryBorderColor', hover: 'btnSecondaryBorderColorHover' },
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
					paddingLeft: '12px',
					paddingRight: '12px',
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
		{
			variants: {
				sizeVariant: 'small',
				iconOnly: true,
			},
			style: {
				width: '32px',
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
