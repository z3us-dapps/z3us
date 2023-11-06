import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const imageWrapper = recipe({
	base: {
		margin: 'none',
		padding: 'none',
		position: 'relative',
		flexShrink: 0,
		boxShadow: 'inset 0 0 1px 0px',
	},
	variants: {
		size: {
			small: { width: '20px', height: '20px' },
			medium: { width: '24px', height: '24px' },
			large: { width: '32px', height: '32px' },
			xlarge: { width: '40px', height: '40px' },
			xxlarge: { width: '64px', height: '64px' },
		},
		sizeTablet: {
			small: responsiveStyle({
				tablet: { width: '20px', height: '20px' },
			}),
			medium: responsiveStyle({
				tablet: { width: '24px', height: '24px' },
			}),
			large: responsiveStyle({
				tablet: { width: '32px', height: '32px' },
			}),
			xlarge: responsiveStyle({
				tablet: { width: '40px', height: '40px' },
			}),
			xxlarge: responsiveStyle({
				tablet: { width: '64px', height: '64px' },
			}),
		},
		rounded: {
			true: { borderRadius: 999 },
		},
	},

	compoundVariants: [],
	defaultVariants: {
		size: 'medium',
		rounded: true,
	},
})

export const imageFallbackTextWrapper = recipe({
	base: {
		flexShrink: 0,
		textTransform: 'uppercase',
	},
	variants: {
		size: {
			small: { fontSize: '9px', lineHeight: '9px', fontWeight: '500' },
			medium: { fontSize: '10px', lineHeight: '10px', fontWeight: '500' },
			large: { fontSize: '11px', lineHeight: '11px', fontWeight: '500' },
			xlarge: { fontSize: '12px', lineHeight: '12px', fontWeight: '500' },
			xxlarge: { fontSize: '13px', lineHeight: '13px', fontWeight: '500' },
		},
		sizeTablet: {
			small: responsiveStyle({
				tablet: { fontSize: '9px', lineHeight: '9px', fontWeight: '500' },
			}),
			medium: responsiveStyle({
				tablet: { fontSize: '10px', lineHeight: '10px', fontWeight: '500' },
			}),
			large: responsiveStyle({
				tablet: { fontSize: '11px', lineHeight: '11px', fontWeight: '500' },
			}),
			xlarge: responsiveStyle({
				tablet: { fontSize: '12px', lineHeight: '12px', fontWeight: '500' },
			}),
			xxlarge: responsiveStyle({
				tablet: { fontSize: '13px', lineHeight: '13px', fontWeight: '500' },
			}),
		},
	},
	defaultVariants: {
		size: 'medium',
	},
})

export const imageAvatarRootWrapper = style([
	sprinkles({
		borderRadius: 'full',
		width: 'full',
		height: 'full',
	}),
	{},
])

export const imageAvatarImageWrapper = recipe({
	base: sprinkles({
		width: 'full',
		height: 'full',
	}),
	variants: {
		rounded: {
			true: sprinkles({
				borderRadius: 'full',
			}),
		},
	},
	defaultVariants: {
		rounded: true,
	},
})

export const imageAvatarFallbackWrapper = style([
	sprinkles({
		borderRadius: 'full',
		width: 'full',
		height: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{},
])
