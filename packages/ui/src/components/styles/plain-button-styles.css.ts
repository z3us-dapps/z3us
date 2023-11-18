import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const plainButtonHoverWrapper = style([
	sprinkles({
		cursor: 'pointer',
		transition: 'fast',
		borderRadius: 'small',
		flexGrow: 0,
		flexShrink: 0,
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
