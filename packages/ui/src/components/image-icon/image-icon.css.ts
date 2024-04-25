import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const imageWrapper = recipe({
	base: [
		sprinkles({
			borderRadius: 'small',
			position: 'relative',
			flexShrink: 0,
			padding: 'none',
			margin: 'none',
		}),
		{
			boxShadow: 'inset 0 0 1px 0px',
		},
	],
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
			true: sprinkles({
				borderRadius: 'full',
			}),
		},
	},

	compoundVariants: [],
	defaultVariants: {
		size: 'medium',
		rounded: true,
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
