import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

const fadeIn = keyframes({
	'0%': { transform: 'scale(0.90) translateY(-5px)', opacity: '0' },
	'100%': { transform: 'scale(1.00) translateY(0px)', opacity: '1' },
})

const fadeOut = keyframes({
	'0%': { transform: 'scale(1.00) translateY(0px)', opacity: '1' },
	'100%': { transform: 'scale(0.90) translateY(0px)', opacity: '0' },
})

export const toolTipContent = style([
	sprinkles({
		color: 'colorNeutral',
		paddingX: 'small',
		paddingY: 'small',
		borderRadius: 'small',
		pointerEvents: 'none',
	}),
	{
		maxWidth: '220px',
		overflowWrap: 'break-word',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		animationDuration: '300ms',
		animationFillMode: 'forwards',
		selectors: {
			'&[data-state="delayed-open"]': {
				animationName: fadeIn,
				animationFillMode: 'forwards',
			},
			'&[data-state="closed"]': {
				animation: fadeOut,
				animationFillMode: 'forwards',
			},
		},
	},

	responsiveStyle({
		mobile: { maxWidth: '230px' },
		tablet: { maxWidth: '320px' },
		desktop: { maxWidth: '320px' },
	}),
])

export const toolTipContentBgSecondary = style([
	sprinkles({
		background: 'backgroundSecondary',
	}),
	{},
])

export const toolTipContentBgPrimary = style([
	sprinkles({
		background: 'backgroundPrimary',
	}),
	{},
])

export const toolTipArrow = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const toolTipArrowFillSecondary = style([
	sprinkles({
		fill: 'backgroundSecondary',
	}),
	{},
])
export const toolTipArrowFillPrimary = style([
	sprinkles({
		fill: 'backgroundPrimary',
	}),
	{},
])
