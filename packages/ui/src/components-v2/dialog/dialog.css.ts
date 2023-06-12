import { style } from '@vanilla-extract/css'

import {
	fadeIn,
	fadeOut,
	sharedPopoverBgSelectorStyles,
	sharedPopoverBgSprinkles,
	sharedPopoverBgStyles,
} from '../dropdown-menu/dropdown-menu.css'
import type { Sprinkles } from '../system/sprinkles.css'
import { sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

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
	}),
	{
		background: 'white',
		transform: 'translate(-50%, -50%)',
		width: '560px',
		top: '50%',
		left: '50%',
	},
])

export const dialogContentExpanded = style([
	sprinkles({
		...(sharedPopoverBgSprinkles as Sprinkles),
	}),
	{
		...sharedPopoverBgStyles,
		zIndex: 1,
		position: 'absolute',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		selectors: {
			...sharedPopoverBgSelectorStyles,
		},
	},
	responsiveStyle({
		mobile: { width: '220px' },
		tablet: { width: '560px' },
	}),
])

export const dialogContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const dialogContentCloseWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		marginTop: 'medium',
		marginRight: 'medium',
	}),
	{},
])


export const dialogContentSimpleBarWrapper = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'medium',
		overflow: 'clip',
	}),
	{},
	responsiveStyle({
		mobile: { maxHeight: '60vh' },
		tablet: { maxHeight: '80vh' },
	}),
])
