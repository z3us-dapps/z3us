import { style } from '@vanilla-extract/css'

import { fadeIn, fadeOut } from 'ui/src/components/dropdown-menu/styles.css'
import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const dialogOverlay = style([
	sprinkles({
		position: 'fixed',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 2,
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
		zIndex: 2,
		background: 'backgroundSecondary',
		boxShadow: 'shadowPanel',
		borderRadius: 'large',
		overflow: 'hidden',
		color: 'colorNeutral',
	}),
	{
		transform: 'translateX(-50%)',
		left: '50%',
		width: '100%',
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
