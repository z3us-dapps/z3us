import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../system/sprinkles.css'

export const baseSprinkles = style([
	sprinkles({
		transition: 'fast',
	}),
])

export const button = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		textDecoration: 'none',
		cursor: 'pointer',
		flexShrink: 0,
		margin: '0',
		padding: '0',
		outline: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
	},
	variants: {
		styleVariant: {
			primary: sprinkles({
				background: { lightMode: 'purple500', hover: 'purple600', focus: 'purple600' },
				color: 'purple0',
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
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
			inverse: sprinkles({
				background: { lightMode: 'btnInverseBackground', hover: 'btnInverseBackgroundHover' },
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
				color: 'colorInverse',
			}),
			ghost: sprinkles({
				background: {
					lightMode: 'transparent',
					hover: 'btnSecondaryBackgroundHover',
					active: 'btnSecondaryBackground',
					focusVisible: 'btnSecondaryBackgroundHover',
				},
				borderColor: { lightMode: 'transparent', hover: 'btnGhostBorderColorHover' },
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
				color: 'colorNeutral',
				border: 1,
				borderStyle: 'solid',
			}),
			'white-transparent': sprinkles({
				background: {
					lightMode: 'transparent',
					hover: 'btnWhiteTransparentBackgroundHover',
				},
				borderColor: { lightMode: 'transparent', hover: 'transparent' },
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
				color: 'white',
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
					fontSize: '15px',
					lineHeight: '20px',
					paddingLeft: '8px',
					paddingRight: '8px',
					gap: '6px',
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
					height: '44px',
				},
			],
			xlarge: [
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
			true: {},
		},
		iconOnly: {
			true: {},
		},
		disabled: {
			true: {
				cursor: 'not-allowed',
			},
		},
	},
	compoundVariants: [
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
				sizeVariant: 'large',
				iconOnly: true,
			},
			style: {
				width: '44px',
				padding: '0px',
			},
		},
		{
			variants: {
				sizeVariant: 'xlarge',
				iconOnly: true,
			},
			style: {
				width: '48px',
				padding: '0px',
			},
		},
		{
			variants: {
				styleVariant: 'ghost',
				disabled: true,
			},
			style: {
				opacity: 0.6,
			},
		},
		{
			variants: {
				sizeVariant: 'small',
				rounded: true,
			},
			style: {
				borderRadius: '18px',
				paddingLeft: '12px',
				paddingRight: '12px',
			},
		},
		{
			variants: {
				sizeVariant: 'small',
				rounded: true,
				iconOnly: true,
			},
			style: {
				borderRadius: '50%',
				paddingLeft: '0px',
				paddingRight: '0px',
			},
		},
		{
			variants: {
				sizeVariant: 'large',
				rounded: true,
				iconOnly: true,
			},
			style: {
				borderRadius: '50%',
			},
		},
	],
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
		iconOnly: false,
		disabled: false,
		rounded: false,
	},
})

export type ButtonVariants = RecipeVariants<typeof button>

export const buttonIconLeft = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		textDecoration: 'none',
		outline: 'none',
		cursor: 'pointer',
	},
	variants: {
		styleVariant: {
			primary: sprinkles({
				color: 'purple100',
			}),
			secondary: sprinkles({
				color: 'colorNeutral',
			}),
			tertiary: sprinkles({
				color: 'colorNeutral',
			}),
			inverse: sprinkles({
				color: 'colorNeutral',
			}),
			ghost: sprinkles({
				color: 'colorNeutral',
			}),
			'white-transparent': sprinkles({
				color: 'white',
			}),
		},
		sizeVariant: {
			small: [{ marginLeft: '-6px' }],
			medium: [],
			large: [],
			xlarge: [],
		},
		iconOnly: {
			true: {},
		},
	},
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
	},
})

export const buttonIconRight = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		textDecoration: 'none',
		outline: 'none',
		cursor: 'pointer',
	},
	variants: {
		styleVariant: {
			primary: sprinkles({
				color: 'purple100',
			}),
			secondary: sprinkles({
				color: 'colorNeutral',
			}),
			tertiary: sprinkles({
				color: 'colorNeutral',
			}),
			inverse: sprinkles({
				color: 'colorNeutral',
			}),
			ghost: sprinkles({
				color: 'colorNeutral',
			}),
			'white-transparent': [
				sprinkles({
					color: 'white',
				}),
				{
					opacity: '0.8',
				},
			],
		},
		sizeVariant: {
			small: [{ marginRight: '-6px' }],
			medium: [],
			large: [],
			xlarge: [],
		},
		iconOnly: {
			true: {},
		},
	},

	compoundVariants: [
		{
			variants: {
				sizeVariant: 'small',
				iconOnly: true,
			},
			style: {
				marginRight: '0',
			},
		},
	],
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
	},
})
