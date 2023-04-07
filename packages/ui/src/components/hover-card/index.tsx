import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { keyframes, styled } from '@stitches/react'
import React from 'react'

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

const StyledContent = styled(HoverCardPrimitive.Content, {
	borderRadius: '$2',
	padding: '$3',
	width: 300,
	backgroundColor: '$bgPanel',
	boxShadow: '$tooltip',
	'@media (prefers-reduced-motion: no-preference)': {
		'&[data-state="closed"]': {
			animation: `${animateOut} 300ms ease`,
			animationFillMode: 'forwards',
		},
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
