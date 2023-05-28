import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'

export const checkboxWrapper = recipe({
	base: {
		margin: 0,
		alignItems: 'center',
		justifyContent: 'center',
		outline: 'none',
		display: 'inline-flex',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
	},
	variants: {
		styleVariant: {
			primary: sprinkles({
				background: { lightMode: 'btnTertiaryBackground', hover: 'btnTertiaryBackgroundHover' },
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
				color: 'colorStrong',
				borderColor: { lightMode: 'btnTertiaryBorderColor', hover: 'btnTertiaryBorderColorHover' },
				border: 1,
				borderStyle: 'solid',
			}),
			secondary: sprinkles({
				background: {
					lightMode: 'btnSecondaryBackground',
					hover: 'btnSecondaryBackgroundHover',
					active: 'btnSecondaryBackground',
					focusVisible: 'btnSecondaryBackgroundHover',
				},
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
				color: 'colorNeutral',
				borderColor: { lightMode: 'btnSecondaryBorderColor', hover: 'btnSecondaryBorderColorHover' },
				border: 1,
				borderStyle: 'solid',
			}),
			'secondary-error': sprinkles({
				background: {
					lightMode: 'btnSecondaryBackground',
					hover: 'btnSecondaryBackgroundHover',
					active: 'btnSecondaryBackground',
					focusVisible: 'btnSecondaryBackgroundHover',
				},
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
				color: 'colorNeutral',
				borderColor: { lightMode: 'red500', hover: 'red500' },
				border: 1,
				borderStyle: 'solid',
			}),
			tertiary: sprinkles({
				background: { lightMode: 'btnTertiaryBackground', hover: 'btnTertiaryBackgroundHover' },
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
				color: 'colorStrong',
				borderColor: { lightMode: 'btnTertiaryBorderColor', hover: 'btnTertiaryBorderColorHover' },
				border: 1,
				borderStyle: 'solid',
			}),
		},
		sizeVariant: {
			small: [
				sprinkles({
					borderRadius: 'small',
				}),
				{
					width: '24px',
					height: '24px',
				},
			],
			medium: [
				sprinkles({
					borderRadius: 'medium',
				}),
				{
					width: '32px',
					height: '32px',
				},
			],
		},
		disabled: {
			true: {
				cursor: 'not-allowed',
				pointerEvents: 'none',
				opacity: '0.7',
			},
		},
	},
	compoundVariants: [],
	defaultVariants: {
		styleVariant: 'secondary',
		sizeVariant: 'small',
		disabled: false,
	},
})

export type CheckboxVariants = RecipeVariants<typeof checkboxWrapper>

export const checkboxIndicator = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
		height: 'full',
	}),
	{
		border: '1px solid red',
	},
])
