import { keyframes, style } from '@vanilla-extract/css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { darkMode, sprinkles } from '../system/sprinkles.css'
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
		paddingX: 'xsmall',
		paddingY: 'xsmall',
		borderRadius: 'small',
		pointerEvents: 'none',
		boxShadow: 'shadowTooltip',
	}),
	{
		background: 'rgba(20, 20, 20, 0.9)',
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
			// [`.${darkMode} &`]: {
			// 	background: 'rgba(20, 20, 20, 0.9)',
			// },
		},
	},

	responsiveStyle({
		mobile: { maxWidth: '230px' },
		tablet: { maxWidth: '320px' },
		desktop: { maxWidth: '320px' },
	}),
])

export const toolTipArrow = style([
	sprinkles({
		position: 'relative',
	}),
	{
		fill: 'rgba(20, 20, 20, 0.9)',
		// fill: 'rgba(218, 218, 218, 0.5)',
		// selectors: {
		// 	[`.${darkMode} &`]: {
		// 		fill: 'rgba(20, 20, 20, 0.9)',
		// 	},
		// },
	},
])
