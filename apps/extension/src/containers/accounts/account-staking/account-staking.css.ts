import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const fadeIn = keyframes({
	'0%': { opacity: '0' },
	'100%': { opacity: '1' },
})

export const fadeOut = keyframes({
	'0%': { opacity: '1' },
	'100%': { opacity: '0' },
})

export const closeButton = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		marginTop: 'medium',
		marginRight: 'medium',
	}),
	{},
])

export const transactionWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '100px',
		height: '64px',
	},
])

export const transactionOverlay = style([
	sprinkles({
		position: 'fixed',
		inset: 0,
		zIndex: 1,
	}),
	{
		background: 'rgba(0, 0, 0, 0.5)',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		willChange: 'transform, opacity',
		animationDuration: '1150ms',
		selectors: {
			'&[data-state="open"]': {
				animationName: fadeIn,
				animationFillMode: 'forwards',
			},
			'&[data-state="closed"]': {
				animationName: fadeOut,
				animationFillMode: 'forwards',
			},
		},
	},
])

export const transactionContent = style([
	sprinkles({
		position: 'fixed',
		zIndex: 1,
		background: 'backgroundPrimary',
		color: 'colorNeutral',
		top: 0,
		bottom: 0,
		borderLeft: 1,
		borderRight: 1,
		borderTop: 0,
		borderBottom: 0,
		boxShadow: 'shadowDropdown',
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{
		transform: 'translateX(-50%)',
		width: '500px',
		left: '50%',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		willChange: 'transform, opacity',
		animationDuration: '150ms',
		selectors: {
			'&:focus': {
				outline: 'none',
			},
			'&[data-state="open"]': {
				animationName: fadeIn,
				animationFillMode: 'forwards',
			},
			'&[data-state="closed"]': {
				animationName: fadeOut,
				animationFillMode: 'forwards',
			},
		},
	},
])
