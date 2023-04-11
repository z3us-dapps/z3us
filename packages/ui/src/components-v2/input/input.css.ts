import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'

export const baseSprinkles = sprinkles({
	transition: 'fast',
})

// TODO: rename to input
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
					// TODO: focusvisible update
					focusVisible: 'inputPrimaryBorderFocus',
				},
				boxShadow: {
					focus: 'inputPrimaryShadowFocus',
					// TODO: focusvisible update
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
					fontSize: '13px',
					lineHeight: '13px',
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
		rounded: {
			true: {
				borderRadius: '20px',
			},
		},
		leftIcon: {
			true: {},
		},
		rightIcon: {
			true: {},
		},
	},
	compoundVariants: [
		{
			variants: {
				sizeVariant: 'small',
				leftIcon: true,
			},
			style: {
				paddingLeft: '36px',
			},
		},
	],
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
	},
})

export const iconLeft = recipe({
	base: {
		position: 'absolute',
		top: '0',
		left: '0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	variants: {
		sizeVariant: {
			small: [
				{
					height: '32px',
					width: '32px',
				},
			],
			medium: [
				{
					height: '40px',
					width: '40px',
				},
			],
			large: [
				{
					height: '48px',
					width: '48px',
				},
			],
		},
	},
	defaultVariants: {
		sizeVariant: 'medium',
	},
})

export const iconRight = recipe({
	base: {
		position: 'absolute',
		top: '0',
		right: '0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	variants: {
		sizeVariant: {
			small: [
				{
					height: '32px',
					width: '32px',
				},
			],
			medium: [
				{
					height: '40px',
					width: '40px',
				},
			],
			large: [
				{
					height: '48px',
					width: '48px',
				},
			],
		},
	},
	defaultVariants: {
		sizeVariant: 'medium',
	},
})

export type ButtonVariants = RecipeVariants<typeof button>
