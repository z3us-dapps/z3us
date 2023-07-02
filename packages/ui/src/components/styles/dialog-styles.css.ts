import { keyframes, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'

// TODO can import this from components, alert dialog or dialog
export const fadeIn = keyframes({
	'0%': { opacity: '0' },
	'100%': { opacity: '1' },
})

export const fadeOut = keyframes({
	'0%': { opacity: '1' },
	'100%': { opacity: '0' },
})

export const dialogOverlay = style([
	sprinkles({
		position: 'fixed',
		inset: 0,
		zIndex: 1,
		background: 'backgroundOverlayPrimary',
	}),
	{
		backdropFilter: 'blur(5px)',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		willChange: 'transform, opacity',
		animationDuration: '300ms',
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

export const dialogContent = style([
	sprinkles({
		position: 'fixed',
		zIndex: 1,
		background: 'backgroundSecondary',
		boxShadow: 'shadowPanel',
		borderRadius: 'xlarge',
		overflow: 'hidden',
		color: 'colorNeutral',
	}),
	{
		transform: 'translateX(-50%)',
		width: '100%',
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

export const dialogContentFixedHeight = style([
	sprinkles({}),
	{
		top: '50%',
		transform: 'translateY(-50%) translateX(-50%)',
	},
])