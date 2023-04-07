/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { keyframes, styled } from '../../theme'

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

const animateOut = keyframes({
	from: { transform: 'translateY(0)', opacity: 1 },
	to: { transform: 'translateY(4px)', opacity: 0 },
})

const StyledContent = styled(PopoverPrimitive.Content, {
	borderRadius: '$3',
	padding: 0,
	width: 220,
	color: '$txtDefault',
	backgroundColor: '$bgPanel',
	border: '1px solid  $borderPanel2',
	boxShadow: '$tooltip',
	'@media (prefers-reduced-motion: no-preference)': {
		animationDuration: '400ms',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		animationFillMode: 'forwards',
		willChange: 'transform, opacity',
		'&[data-state="open"]': {
			'&[data-side="top"]': { animationName: slideDownAndFade, animationFillMode: 'forwards' },
			'&[data-side="right"]': { animationName: slideLeftAndFade, animationFillMode: 'forwards' },
			'&[data-side="bottom"]': { animationName: slideUpAndFade, animationFillMode: 'forwards' },
			'&[data-side="left"]': { animationName: slideRightAndFade, animationFillMode: 'forwards' },
		},
		'&[data-state="closed"]': {
			animation: `${animateOut} 200ms ease`,
			animationFillMode: 'forwards',
		},
	},
})

const StyledArrow = styled(PopoverPrimitive.Arrow, {
	fill: '$bgPanel',
})

const StyledClose = styled(PopoverPrimitive.Close, {
	all: 'unset',
	cursor: 'pointer',
	fontFamily: 'inherit',
	borderRadius: '$2',
	height: 25,
	width: 25,
	top: 5,
	right: 5,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'absolute',
	transition: '$default',
	backgroundColor: '$buttonBgGhost',
	color: '$buttonText',
	fill: '$buttonText',
	'&:hover': {
		backgroundColor: '$buttonBgGhostHover',
	},

	WebkitTapHighlightColor: 'transparent',
	'&:focus:not(&:focus-visible)': {
		boxShadow: 'none',
	},
	'&:focus': {
		outline: 'none',
		boxShadow: '$buttonFocusShadow',
	},
	'@safari': {
		WebkitTapHighlightColor: 'transparent',
		outline: 'none',
	},
})

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverPortal = PopoverPrimitive.Portal
export const PopoverContent = StyledContent
export const PopoverArrow = StyledArrow
export const PopoverClose = StyledClose
