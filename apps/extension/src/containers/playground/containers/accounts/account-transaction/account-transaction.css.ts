import { keyframes, style } from '@vanilla-extract/css'

import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const fadeIn = keyframes({
	'0%': { opacity: '0' },
	'100%': { opacity: '1' },
})

export const fadeOut = keyframes({
	'0%': { opacity: '1' },
	'100%': { opacity: '0' },
})

export const transactionHeaderWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		paddingX: 'medium',
		background: 'backgroundPrimary',
		boxShadow: 'shadowDropdown',
		borderTopLeftRadius: 'large',
		borderTopRightRadius: 'large',
	}),
	{},
	responsiveStyle({
		mobile: { height: '48px' },
		tablet: { height: '64px' },
	}),
])

export const transactionBodyScrollWrapper = style([
	sprinkles({
		position: 'relative',
		paddingX: 'large',
		paddingBottom: 'large',
	}),
	{
		paddingTop: '64px',
	},

	responsiveStyle({
		mobile: { paddingTop: '48px' },
		tablet: { paddingTop: '64px' },
	}),
])

export const transactionOverlay = style([
	sprinkles({
		position: 'fixed',
		inset: 0,
		zIndex: 1,
	}),
	{
		// TODO: need theme background color
		background: 'rgba(0, 0, 0, 0.6)',
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
		bottom: 0,
		borderLeft: 1,
		borderRight: 1,
		borderTop: 0,
		borderBottom: 0,
		boxShadow: 'shadowActivePanel',
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		borderTopLeftRadius: 'large',
		borderTopRightRadius: 'large',
		overflow: 'clip',
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
	responsiveStyle({
		mobile: { maxWidth: '90%', top: '48px' },
		tablet: { maxWidth: '500px', top: '48px' },
		desktop: { maxWidth: '500px', top: '72px' },
	}),
])
