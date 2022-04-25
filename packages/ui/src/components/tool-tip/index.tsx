import { styled, keyframes } from '@stitches/react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

const animateOut = keyframes({
	from: { transform: 'translateY(0)', opacity: 1 },
	to: { transform: 'translateY(4px)', opacity: 0 },
})

const slideUpAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateX(-2px)' },
	'100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateY(-2px)' },
	'100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
	'0%': { opacity: 0, transform: 'translateX(2px)' },
	'100%': { opacity: 1, transform: 'translateX(0)' },
})

const StyledArrow = styled(TooltipPrimitive.Arrow, {
	fill: '$bgPanel2',
})

const StyledContent = styled(TooltipPrimitive.Content, {
	borderRadius: 4,
	padding: '7px 10px',
	fontSize: '$2',
	lineHeight: 1,
	color: '$txtDefault',
	backgroundColor: '$bgPanel2',
	boxShadow: '$tooltip',
	'@media (prefers-reduced-motion: no-preference)': {
		'&[data-state="closed"]': {
			animation: `${animateOut} 300ms ease`,
		},
		animationDuration: '300ms',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		'&[data-state="delayed-open"]': {
			'&[data-side="top"]': { animationName: slideDownAndFade },
			'&[data-side="right"]': { animationName: slideLeftAndFade },
			'&[data-side="bottom"]': { animationName: slideUpAndFade },
			'&[data-side="left"]': { animationName: slideRightAndFade },
		},
	},
})

export const { Provider } = TooltipPrimitive
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger
export const TooltipContent = StyledContent
export const TooltipArrow = StyledArrow
