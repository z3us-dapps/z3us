import { style } from '@vanilla-extract/css'

import {
	fadeIn,
	fadeOut,
	sharedPopoverBgSelectorStyles,
	sharedPopoverBgSprinkles,
	sharedPopoverBgStyles,
} from '../dropdown-menu/styles.css'
import type { Sprinkles } from 'ui/src/theme/sprinkles.css'
import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const dialogOverlay = style([
	sprinkles({
		position: 'fixed',
		inset: 0,
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
	}),
	{
		background: 'white',
		transform: 'translate(-50%, -50%)',
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
		zIndex: 2,
		position: 'absolute',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		selectors: {
			...sharedPopoverBgSelectorStyles,
		},
	},
])

export const dialogContentWidthMedium = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { width: '90%' },
		tablet: { width: '560px' },
	}),
])

export const dialogContentWidthLarge = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { width: '90%', maxWidth: '780px' },
		tablet: { width: '90%', maxWidth: '780px' },
		desktop: { width: '90%', maxWidth: '1060px' },
	}),
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

export const dialogContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const dialogContentScrollAreaWrapper = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'medium',
		overflow: 'clip',
	}),
	{},
])

export const dialogContentScrollAreaViewportWrapper = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { maxHeight: '90vh' },
		tablet: { maxHeight: '90vh' },
		desktop: { maxHeight: '80vh' },
	}),
])
