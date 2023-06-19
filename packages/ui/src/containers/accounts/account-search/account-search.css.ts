import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const fadeIn = keyframes({
	'0%': { opacity: '0' },
	'100%': { opacity: '1' },
})

export const fadeOut = keyframes({
	'0%': { opacity: '1' },
	'100%': { opacity: '0' },
})

export const searchHeaderWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 'medium',
		padding: 'large',
		background: 'backgroundSecondary',
		borderTopLeftRadius: 'large',
		borderTopRightRadius: 'large',
		borderStyle: 'solid',
		borderBottom: 1,
		borderColor: 'borderDivider',
		transition: 'fast',
		zIndex: 1,
	}),
	{},
	// responsiveStyle({
	// 	mobile: { height: '48px' },
	// 	tablet: { height: '64px' },
	// }),
])

export const searchHeaderWrapperShadow = style([
	sprinkles({
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const searchElement = style([
	sprinkles({
		width: 'full',
	}),
	{},
])

export const searchBodyScrollWrapper = style([
	sprinkles({
		position: 'relative',
		paddingBottom: 'large',
	}),
])

export const searchContent = style([
	sprinkles({
		// position: 'fixed',
		// zIndex: 1,
		// background: {
		// 	lightMode: 'backgroundSecondary',
		// 	darkMode: 'backgroundPrimary',
		// },
		// color: 'colorNeutral',
		// boxShadow: 'shadowActivePanel',
		// borderRadius: 'large',
		// overflow: 'clip',
	}),
	{
		// transform: 'translateX(-50%)',
		// width: '100%',
		// left: '50%',
		// animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		// transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		// willChange: 'transform, opacity',
		// animationDuration: '150ms',
		// selectors: {
		// 	'&:focus': {
		// 		outline: 'none',
		// 	},
		// 	'&[data-state="open"]': {
		// 		animationName: fadeIn,
		// 		animationFillMode: 'forwards',
		// 	},
		// 	'&[data-state="closed"]': {
		// 		animationName: fadeOut,
		// 		animationFillMode: 'forwards',
		// 	},
		// },
	},
	responsiveStyle({
		mobile: { maxWidth: '90%', top: '48px', bottom: '48px' },
		tablet: { maxWidth: '480px', top: '48px', bottom: '48px' },
		desktop: { maxWidth: '480px', top: '72px', bottom: '72px' },
	}),
])

export const searchDetailsWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
		alignItems: 'flex-start',
		paddingTop: {
			mobile: 'large',
			tablet: 'xlarge',
		},
		paddingX: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
])
