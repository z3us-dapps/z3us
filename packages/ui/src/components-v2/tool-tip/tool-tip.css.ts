import { style, keyframes } from '@vanilla-extract/css'
import { sprinkles } from '../system/sprinkles.css'

const fadeIn = keyframes({
	'0%': { transform: 'scale(0.90) translateY(-20px)', opacity: '0' },
	'100%': { transform: 'scale(1.00) translateY(0px)', opacity: '1' },
})

const fadeOut = keyframes({
	'0%': { transform: 'scale(1.00) translateY(0px)', opacity: '1' },
	'100%': { transform: 'scale(0.90) translateY(0px)', opacity: '0' },
})

export const toolTipContent = style([
	sprinkles({
		background: 'backgroundSecondary',
		color: 'colorNeutral',
		paddingX: 'small',
		paddingY: 'small',
		borderRadius: 'medium',
		pointerEvents: 'none',
	}),
	{
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
])

export const toolTipArrow = style([
	sprinkles({
		position: 'relative',
		fill: 'backgroundSecondary',
	}),
	{},
])
