import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const plainButtonHoverWrapper = style([
	sprinkles({
		cursor: 'pointer',
		transition: 'fast',
		borderRadius: 'small',
		color: {
			lightMode: 'colorNeutral',
			hover: 'colorStrong',
		},
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		selectors: {
			'&:focus-visible': {
				position: 'relative',
				zIndex: 1,
			},
		},
	},
])

export const plainButtonHoverUnderlineWrapper = style({
	textDecoration: 'none',
	textUnderlinePosition: 'under',
	textDecorationThickness: 'from-font',
	textDecorationLine: 'underline',
})

