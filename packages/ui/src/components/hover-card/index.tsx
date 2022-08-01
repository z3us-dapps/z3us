import React from 'react'
import { styled, keyframes } from '@stitches/react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'

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

const StyledContent = styled(HoverCardPrimitive.Content, {
	borderRadius: '$2',
	padding: '$3',
	width: 300,
	backgroundColor: '$bgPanel',
	boxShadow: '$tooltip',
	'@media (prefers-reduced-motion: no-preference)': {
		animationDuration: '400ms',
		animationTimingFunction: 'cubic-beer(0.16, 1, 0.3, 1)',
		animationFillMode: 'forwards',
		willChange: 'transform, opacity',
		'&[data-state="open"]': {
			'&[data-side="top"]': { animationName: slideDownAndFade },
			'&[data-side="right"]': { animationName: slideLeftAndFade },
			'&[data-side="bottom"]': { animationName: slideUpAndFade },
			'&[data-side="left"]': { animationName: slideRightAndFade },
		},
	},
})

const StyledArrow = styled(HoverCardPrimitive.Arrow, {
	fill: '$bgPanel',
})

const Content = ({ children, ...props }) => (
	<HoverCardPrimitive.Portal>
		<StyledContent {...props}>
			{children}
			<StyledArrow />
		</StyledContent>
	</HoverCardPrimitive.Portal>
)

export const HoverCard = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger
export const HoverCardContent = Content
export const HoverCardArrow = StyledArrow
