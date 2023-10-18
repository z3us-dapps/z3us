import { style } from '@vanilla-extract/css'
import { type RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'

import { responsiveStyle } from 'ui/src/components/system/theme-utils'

import { sprinkles } from '../system/sprinkles.css'
import { vars } from '../system/theme.css'

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
		outline: 'none',
		WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
		maxWidth: '100%',
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
				borderColor: { lightMode: 'red400', hover: 'red500' },
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
			'tertiary-error': sprinkles({
				background: { lightMode: 'btnTertiaryBackground', hover: 'btnTertiaryBackgroundHover' },
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
				color: 'colorStrong',
				borderColor: { lightMode: 'red400', hover: 'red500' },
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
			destructive: sprinkles({
				background: {
					lightMode: 'red500',
				},
				borderColor: { lightMode: 'transparent', hover: 'transparent' },
				boxShadow: {
					focusVisible: 'btnSecondaryShadowFocus',
				},
				color: 'white',
				border: 1,
				borderStyle: 'solid',
			}),
			avatar: sprinkles({
				background: {
					lightMode: 'transparent',
				},
				boxShadow: {
					hover: 'btnAvatarShadowHover',
					focusVisible: 'btnAvatarShadowFocus',
				},
			}),
		},
		sizeVariant: {
			xsmall: [
				sprinkles({
					borderRadius: 'small',
					padding: 'small',
				}),
				{
					height: '26px',
					fontSize: '12px',
					lineHeight: '12px',
					paddingLeft: '8px',
					paddingRight: '8px',
				},
			],
			small: [
				sprinkles({
					borderRadius: 'small',
					padding: 'small',
				}),
				{
					height: '32px',
					fontSize: '14px',
					lineHeight: '14px',
					paddingLeft: '8px',
					paddingRight: '8px',
				},
			],
			medium: [
				sprinkles({
					borderRadius: 'medium',
				}),
				{
					height: '40px',
					fontSize: '14px',
					fontWeight: '500',
					lineHeight: '14px',
					paddingLeft: '16px',
					paddingRight: '16px',
				},
			],
			large: [
				sprinkles({
					borderRadius: 'large',
					paddingX: 'large',
				}),
				{
					height: '44px',
					fontSize: '15px',
					lineHeight: '15px',
				},
			],
			xlarge: [
				sprinkles({
					borderRadius: 'large',
					paddingX: 'large',
				}),
				{
					height: '48px',
					fontSize: '16px',
					lineHeight: '16px',
					fontWeight: '600',
				},
			],
		},
		sizeVariantTablet: {
			xsmall: [
				sprinkles({
					borderRadius: 'small',
					padding: 'small',
				}),
				{
					height: '26px',
					fontSize: '12px',
					lineHeight: '12px',
					paddingLeft: '8px',
					paddingRight: '8px',
				},
			],
			small: [
				sprinkles({
					borderRadius: 'small',
					padding: 'small',
				}),
				responsiveStyle({
					tablet: {
						height: '32px',
						fontSize: '14px',
						lineHeight: '14px',
						paddingLeft: '8px',
						paddingRight: '8px',
					},
				}),
			],
			medium: [
				sprinkles({
					borderRadius: 'medium',
				}),
				responsiveStyle({
					tablet: {
						height: '40px',
						fontSize: '14px',
						fontWeight: '500',
						lineHeight: '14px',
						paddingLeft: '16px',
						paddingRight: '16px',
					},
				}),
			],
			large: [
				sprinkles({
					borderRadius: 'large',
					paddingX: 'large',
				}),
				responsiveStyle({
					tablet: {
						height: '44px',
						fontSize: '15px',
						lineHeight: '15px',
					},
				}),
			],
			xlarge: [
				sprinkles({
					borderRadius: 'large',
					paddingX: 'large',
				}),
				responsiveStyle({
					tablet: {
						height: '48px',
						fontSize: '16px',
						lineHeight: '16px',
						fontWeight: '700',
					},
				}),
			],
		},
		fullWidth: {
			true: {
				width: '100%',
			},
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
				pointerEvents: 'none',
				opacity: '0.7',
			},
		},
		active: {
			true: {},
		},
	},
	compoundVariants: [
		{
			variants: {
				sizeVariant: 'xsmall',
				iconOnly: true,
			},
			style: {
				width: '26px',
				padding: '0px',
			},
		},
		{
			variants: {
				sizeVariantTablet: 'xsmall',
				iconOnly: true,
			},
			style: [
				responsiveStyle({
					tablet: {
						width: '26px',
						padding: '0px',
					},
				}),
			],
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
		{
			variants: {
				sizeVariantTablet: 'small',
				iconOnly: true,
			},
			style: [
				responsiveStyle({
					tablet: {
						width: '32px',
						padding: '0px',
					},
				}),
			],
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
				sizeVariantTablet: 'medium',
				iconOnly: true,
			},
			style: [
				responsiveStyle({
					tablet: {
						width: '40px',
						padding: '0px',
					},
				}),
			],
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
				sizeVariantTablet: 'large',
				iconOnly: true,
			},
			style: [
				responsiveStyle({
					tablet: {
						width: '44px',
						padding: '0px',
					},
				}),
			],
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
				sizeVariantTablet: 'xlarge',
				iconOnly: true,
			},
			style: [
				responsiveStyle({
					tablet: {
						width: '48px',
						padding: '0px',
					},
				}),
			],
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
				sizeVariant: 'medium',
				rounded: true,
				iconOnly: true,
			},
			style: {
				borderRadius: '50%',
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
		{
			variants: {
				sizeVariant: 'xlarge',
				rounded: true,
			},
			style: {
				borderRadius: '48px',
			},
		},
		{
			variants: {
				styleVariant: 'avatar',
				active: true,
			},
			style: {
				boxShadow: `${vars.color.btnAvatarShadowHover}`,
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
		flexShrink: 0,
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
			'secondary-error': sprinkles({
				color: 'colorNeutral',
			}),
			tertiary: sprinkles({
				color: 'colorNeutral',
			}),
			'tertiary-error': sprinkles({
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
			destructive: sprinkles({
				color: 'white',
			}),
			avatar: sprinkles({
				color: 'white',
			}),
		},
		sizeVariant: {
			xsmall: [{ marginRight: '4px', marginLeft: '-2px' }],
			small: [{ marginRight: '4px', marginLeft: '-4px' }],
			medium: [{ marginRight: '2px', marginLeft: '-6px' }],
			large: [{ marginRight: '6px', marginLeft: '-6px' }],
			xlarge: [{ marginRight: '6px', marginLeft: '-6px' }],
		},
		sizeVariantTablet: {
			xsmall: [
				responsiveStyle({
					tablet: { marginRight: '4px', marginLeft: '-2px' },
				}),
			],
			small: [
				responsiveStyle({
					tablet: { marginRight: '4px', marginLeft: '-4px' },
				}),
			],
			medium: [
				responsiveStyle({
					tablet: { marginRight: '2px', marginLeft: '-6px' },
				}),
			],
			large: [
				responsiveStyle({
					tablet: { marginRight: '6px', marginLeft: '-6px' },
				}),
			],
			xlarge: [
				responsiveStyle({
					tablet: { marginRight: '6px', marginLeft: '-6px' },
				}),
			],
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
		flexShrink: 0,
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
			'secondary-error': sprinkles({
				color: 'colorNeutral',
			}),
			tertiary: sprinkles({
				color: 'colorNeutral',
			}),
			'tertiary-error': sprinkles({
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
			destructive: [
				sprinkles({
					color: 'white',
				}),
				{
					opacity: '0.8',
				},
			],
			avatar: sprinkles({
				color: 'colorNeutral',
			}),
		},
		sizeVariant: {
			xsmall: [{ marginLeft: '4px', marginRight: '-6px' }],
			small: [{ marginLeft: '4px', marginRight: '-4px' }],
			medium: [{ marginLeft: '4px', marginRight: '-8px' }],
			large: [{ marginLeft: '6px', marginRight: '-6px' }],
			xlarge: [{ marginLeft: '6px', marginRight: '-6px' }],
		},
		sizeVariantTablet: {
			xsmall: [{ marginLeft: '4px', marginRight: '-6px' }],
			small: [{ marginLeft: '4px', marginRight: '-4px' }],
			medium: [{ marginLeft: '4px', marginRight: '-8px' }],
			large: [{ marginLeft: '6px', marginRight: '-6px' }],
			xlarge: [{ marginLeft: '6px', marginRight: '-6px' }],
		},
		iconOnly: {
			true: {},
		},
	},
	compoundVariants: [
		{
			variants: {
				sizeVariant: 'xsmall',
				iconOnly: true,
			},
			style: {
				marginRight: '0',
				marginLeft: '0',
			},
		},
		{
			variants: {
				sizeVariant: 'small',
				iconOnly: true,
			},
			style: {
				marginRight: '0',
				marginLeft: '0',
			},
		},
		{
			variants: {
				sizeVariant: 'medium',
				iconOnly: true,
			},
			style: {
				marginRight: '0',
				marginLeft: '0',
			},
		},
	],
	defaultVariants: {
		styleVariant: 'primary',
		sizeVariant: 'medium',
	},
})
