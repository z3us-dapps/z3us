import { style } from '@vanilla-extract/css'

import {
	fadeIn,
	fadeOut,
	sharedPopoverBgSelectorStyles,
	sharedPopoverBgSprinkles,
	sharedPopoverBgStyles,
} from '../dropdown-menu/styles.css'
import { sprinkles } from '../system/sprinkles.css'
import type { Sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

export const alertDialogOverlay = style([
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

export const alertDialogContent = style([
	sprinkles({
		...(sharedPopoverBgSprinkles as Sprinkles),
		width: 'full',
		padding: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
	{
		...sharedPopoverBgStyles,
		zIndex: 2,
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		selectors: {
			...sharedPopoverBgSelectorStyles,
		},
	},
	responsiveStyle({
		mobile: { width: '90%', maxWidth: '420px' },
		tablet: { width: '100%', maxWidth: '560px' },
		desktop: { maxWidth: '560px' },
	}),
])

export const alertDialogDescriptionWrapper = style([
	sprinkles({
		paddingTop: {
			mobile: 'xsmall',
			tablet: 'small',
		},
	}),
])

export const alertDialogFooterWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: 'medium',
		paddingTop: {
			mobile: 'medium',
			tablet: 'large',
		},
	}),
])
