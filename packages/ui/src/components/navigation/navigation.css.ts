import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const navigationWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		borderBottomStyle: 'solid',
		zIndex: 1,
		borderColor: {
			lightMode: 'bleached_silk600',
			darkMode: 'lead500',
		},
		paddingX: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
	}),
	{},
	responsiveStyle({
		tablet: {
			borderBottomWidth: '1px',
		},
	}),
])

export const navigationInnerWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	responsiveStyle({
		mobile: {
			height: '58px',
		},
		tablet: {
			height: '70px',
		},
	}),
])

export const navigationMenu = style([
	sprinkles({
		flexGrow: 1,
		gap: 'medium',
		paddingLeft: 'large',
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
	}),
	{
		listStyleType: 'none',
	},
])

export const navigationMenuActiveLine = style([
	sprinkles({
		position: 'absolute',
		inset: 0,
		pointerEvents: 'none',
		borderRadius: 'xlarge',
		background: {
			lightMode: 'white',
			darkMode: 'backgroundSecondary',
		},
	}),
	{
		height: '100%',
		width: '100%',
	},
])

export const copiedAnimationWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		height: '24px',
		width: '24px',
	},
])

export const accountsHomeMobileHeader = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		left: 0,
		width: 'full',
		pointerEvents: 'none',
		display: 'flex',
		justifyContent: 'flex-end',
		transition: 'fast',
	}),
	{
		height: '48px',
	},
])

export const accountsHomeMobileHeaderShadow = style([
	sprinkles({
		background: 'backgroundPrimary',
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const accountsHomeMobileHeaderWalletWrapper = style([
	sprinkles({
		pointerEvents: 'auto',
		display: 'flex',
		alignItems: 'center',
		paddingX: 'small',
	}),
	{
		height: '48px',
		width: '100%',
	},
])

export const navigationMobileWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			tablet: 'none',
		},
		position: 'sticky',
		flexShrink: 0,
		justifyContent: 'center',
		bottom: 0,
		borderTop: 1,
		zIndex: 1,
		borderTopStyle: 'solid',
		width: 'full',
		borderColor: 'borderDivider',
		background: 'backgroundSecondary',
	}),
	{
		height: '48px',
	},
])

export const navigationMenuLinkMobile = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		paddingX: 'medium',
		justifyContent: 'center',
		position: 'relative',
		textDecoration: 'none',
		transition: 'fast',
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
		background: {
			lightMode: 'backgroundSecondary',
			hover: 'backgroundPrimary',
		},
	}),
	{
		outline: 0,
		width: '84px',
		flexBasis: '84px',
		selectors: {
			'&:focus-visible': {
				position: 'relative',
				zIndex: 1,
			},
		},
	},
])

export const navigationMenuLinkMobileCircle = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'full',
		transition: 'fast',
	}),
	{
		width: '32px',
		height: '32px',
	},
])

export const navigationMenuLinkMobileCircleSelect = style([
	sprinkles({
		color: 'white',
		background: 'purple400',
	}),
	{},
])

export const fadeIn = keyframes({
	'0%': { transform: 'translateX(-100%)' },
	'100%': { transform: 'translateX(0%)' },
})

export const fadeOut = keyframes({
	'0%': { transform: 'translateX(0%)' },
	'100%': { transform: 'translateX(-100%)' },
})

export const mobileSlideOutDialogContent = style([
	sprinkles({
		position: 'fixed',
		zIndex: 1,
		background: 'backgroundSecondary',
		boxShadow: 'shadowPanel',
		overflow: 'hidden',
		color: 'colorNeutral',
		height: '100vh',
		left: 0,
		top: 0,
	}),
	{
		maxWidth: '420px',
		width: '80%',
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
