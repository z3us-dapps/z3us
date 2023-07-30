import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

const TRANSLATE_PX = '4px'
const INITIAL_SCALE = '0.90'

const slideUpAndFade = keyframes({
	'0%': { opacity: 0, transform: `scale(${INITIAL_SCALE}) translateY(${TRANSLATE_PX})` },
	'100%': { opacity: 1, transform: 'scale(1.00) translateY(0)' },
})

const slideDownAndFade = keyframes({
	'0%': { opacity: 0, transform: `scale(${INITIAL_SCALE}) translateY(-${TRANSLATE_PX})` },
	'100%': { opacity: 1, transform: 'scale(1.00) translateY(0)' },
})

const slideRightAndFade = keyframes({
	'0%': { opacity: 0, transform: `scale(${INITIAL_SCALE}) translateX(-${TRANSLATE_PX})` },
	'100%': { opacity: 1, transform: 'scale(1.00) translateX(0)' },
})

const slideLeftAndFade = keyframes({
	'0%': { opacity: 0, transform: `scale(${INITIAL_SCALE}) translateX(${TRANSLATE_PX})` },
	'100%': { opacity: 1, transform: 'scale(1.00) translateX(0)' },
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
		boxShadow: 'shadowTooltip',
	}),
	{
		maxWidth: '220px',
		zIndex: '10',
		overflowWrap: 'break-word',
		animationDuration: '400ms',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		selectors: {
			'&[data-state="delayed-open"][data-side="top"]': {
				animationName: slideDownAndFade,
			},
			'&[data-state="delayed-open"][data-side="bottom"]': {
				animationName: slideUpAndFade,
			},
			'&[data-state="delayed-open"][data-side="left"]': {
				animationName: slideRightAndFade,
			},
			'&[data-state="delayed-open"][data-side="right"]': {
				animationName: slideLeftAndFade,
			},
			'&[data-state="closed"]': {
				animation: `${fadeOut} 0.2s ease-out`,
				animationDelay: '300ms',
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
		background: {
			lightMode: 'bai_pearl200',
			darkMode: 'backgroundSecondary',
		},
	}),
	{},
])

export const toolTipContentBgPrimary = style([
	sprinkles({
		background: {
			lightMode: 'bai_pearl300',
			darkMode: 'backgroundPrimary',
		},
	}),
	{},
])

export const toolTipArrowFillSecondary = style([
	sprinkles({
		fill: {
			lightMode: 'bai_pearl200',
			darkMode: 'backgroundSecondary',
		},
	}),
	{},
])
export const toolTipArrowFillPrimary = style([
	sprinkles({
		fill: {
			lightMode: 'bai_pearl300',
			darkMode: 'backgroundPrimary',
		},
	}),
	{},
])

export const toolTipArrow = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])
