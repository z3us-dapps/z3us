import { style } from '@vanilla-extract/css'
import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'

import { vars } from 'ui/src/components/system/theme.css'

import { sprinkles } from '../system/sprinkles.css'

export const baseSprinkles = sprinkles({
	width: 'full',
	transition: 'fast',
})

export const inputWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
])

export const textAreaDefault = style([
	sprinkles({
		paddingTop: 'medium',
	}),
	{
		height: 'auto',
	},
])

export const input = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		outline: 'none',
		fontFamily: vars.fonts.body,
		selectors: {
			'&::placeholder': {
				color: vars.color.colorNeutral,
			},
		},
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
			secondary: [
				sprinkles({
					background: {
						lightMode: 'inputSecondaryBackground',
						hover: 'inputSecondaryBackgroundHover',
						focus: 'inputSecondaryBackgroundFocus',
						focusVisible: 'inputSecondaryBackgroundFocus',
					},
					borderColor: {
						lightMode: 'inputSecondaryBorderColor',
						hover: 'inputSecondaryBorderHover',
						focus: 'inputSecondaryBorderFocus',
						focusVisible: 'inputSecondaryBorderFocus',
					},
					boxShadow: {
						focus: 'inputSecondaryShadowFocus',
						focusVisible: 'inputSecondaryShadowFocus',
					},
					color: 'colorStrong',
					border: 1,
					borderStyle: 'solid',
				}),
			],
			'primary-error': sprinkles({
				background: {
					lightMode: 'inputPrimaryBackground',
					hover: 'inputPrimaryBackgroundHover',
					focus: 'inputPrimaryBackgroundFocus',
					focusVisible: 'inputPrimaryBackgroundFocus',
				},
				borderColor: {
					lightMode: 'red500',
					hover: 'red500',
					focus: 'red500',
					focusVisible: 'red500',
				},
				boxShadow: {
					focus: 'inputPrimaryShadowFocus',
					focusVisible: 'inputPrimaryShadowFocus',
				},
				color: 'colorStrong',
				border: 1,
				borderStyle: 'solid',
			}),
			'secondary-error': sprinkles({
				background: {
					lightMode: 'inputSecondaryBackground',
					hover: 'inputSecondaryBackgroundHover',
					focus: 'inputSecondaryBackgroundFocus',
					focusVisible: 'inputSecondaryBackgroundFocus',
				},
				borderColor: {
					lightMode: 'red500',
					hover: 'red500',
					focus: 'red500',
					focusVisible: 'red500',
				},
				boxShadow: {
					focus: 'inputSecondaryShadowFocus',
					focusVisible: 'inputSecondaryShadowFocus',
				},
				color: 'colorStrong',
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
				},
			],
			large: [
				sprinkles({
					borderRadius: 'large',
					paddingY: 'medium',
				}),
				{
					height: '48px',
					fontSize: '15px',
					lineHeight: '15px',
					paddingLeft: '12px',
					paddingRight: '12px',
				},
			],
		},
		rounded: {
			true: {
				borderRadius: '20px',
			},
		},
		disabled: {
			true: {
				pointerEvents: 'none',
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
		{
			variants: {
				sizeVariant: 'medium',
				leftIcon: true,
			},
			style: {
				paddingLeft: '36px',
			},
		},
		{
			variants: {
				sizeVariant: 'large',
				leftIcon: true,
			},
			style: {
				paddingLeft: '36px',
			},
		},
		{
			variants: {
				sizeVariant: 'small',
				rightIcon: true,
			},
			style: {
				paddingRight: '36px',
			},
		},
		{
			variants: {
				sizeVariant: 'medium',
				rightIcon: true,
			},
			style: {
				paddingRight: '36px',
			},
		},
		{
			variants: {
				sizeVariant: 'large',
				rightIcon: true,
			},
			style: {
				paddingRight: '36px',
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
					// width: '32px',
					marginRight: '16px',
				},
			],
			medium: [
				{
					height: '40px',
					// width: '40px',
					marginRight: '16px',
				},
			],
			large: [
				{
					height: '48px',
					// width: '48px',
					marginRight: '16px',
				},
			],
		},
	},
	defaultVariants: {
		sizeVariant: 'medium',
	},
})

export type InputVariants = RecipeVariants<typeof input>
