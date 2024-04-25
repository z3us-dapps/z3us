import { keyframes, style } from '@vanilla-extract/css'

import { fadeIn, fadeOut } from 'ui/src/components/dropdown-menu/styles.css'
import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { breakpoints, responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const transactionSlideIn = keyframes({
	'0%': { transform: 'translateX(100%)' },
	'100%': { transform: 'translateX(0%)' },
})

export const transactionSlideOut = keyframes({
	'0%': { transform: 'translateX(0%)' },
	'100%': { transform: 'translateX(100%)' },
})

export const slideOutDialogHeaderWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		paddingX: 'medium',
		paddingY: 'medium',
		background: 'backgroundSecondary',
		transition: 'fast',
	}),
	{},
	responsiveStyle({
		mobile: {
			height: '48px',
			borderTopLeftRadius: vars.border.radius.large,
			borderTopRightRadius: vars.border.radius.large,
		},
		tablet: {
			borderTopLeftRadius: '0',
			borderTopRightRadius: '0',
		},
	}),
])

export const slideOutDialogScrollWrapper = style([
	sprinkles({
		width: 'full',
	}),
	{},
	responsiveStyle({
		mobile: { height: 'calc(100vh - 96px)' },
		tablet: { height: 'calc(100vh - 48px)' },
	}),
])

export const slideOutDialogOverlay = style([
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

export const slideOutDialogContent = style([
	sprinkles({
		position: 'fixed',
		zIndex: 2,
		background: 'backgroundSecondary',
		boxShadow: 'shadowPanel',
		overflow: 'hidden',
		color: 'colorNeutral',
		right: 0,
		top: 0,
	}),
	{
		transform: 'translateX(-50%)',
		left: '50%',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		willChange: 'transform, opacity',
		animationDuration: '300ms',

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

		'@media': {
			[`screen and (min-width: ${breakpoints.tablet}px)`]: {
				selectors: {
					'&[data-state="open"]': {
						animationName: transactionSlideIn,
						animationFillMode: 'forwards',
					},
					'&[data-state="closed"]': {
						animationName: transactionSlideOut,
						animationFillMode: 'forwards',
					},
				},
			},
		},
	},
	responsiveStyle({
		mobile: {
			maxWidth: 'calc(100% - 48px)',
			top: '24px',
			bottom: '24px',
			width: '100%',
			height: 'unset',
			borderRadius: vars.border.radius.medium,
		},
		tablet: {
			maxWidth: '380px',
			height: '100vh',
			borderRadius: 0,
			top: 0,
			bottom: 0,
			left: 'unset',
			right: '0',
		},
		desktop: { maxWidth: '420px' },
	}),
])
