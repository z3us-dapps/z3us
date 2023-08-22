import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const transactionSlideIn = keyframes({
	'0%': { transform: 'translateX(100%)' },
	'100%': { transform: 'translateX(0%)' },
})

export const transactionSlideOut = keyframes({
	'0%': { transform: 'translateX(0%)' },
	'100%': { transform: 'translateX(100%)' },
})

export const transactionHeaderWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'flex',
		alignItems: 'center',
		paddingX: 'medium',
		paddingY: 'medium',
		background: 'backgroundSecondary',
		borderTopLeftRadius: 'large',
		borderTopRightRadius: 'large',
		transition: 'fast',
	}),
	{},
	responsiveStyle({
		mobile: { height: '48px' },
		tablet: { height: '64px' },
	}),
])

export const transactionHeaderWrapperShadow = style([
	sprinkles({
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const transactionBodyScrollWrapper = style([
	sprinkles({
		position: 'relative',
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

// NOTE: might bring back, trialing new slide in styles
// export const fadeIn = keyframes({
// 	'0%': { opacity: '0' },
// 	'100%': { opacity: '1' },
// })

// export const fadeOut = keyframes({
// 	'0%': { opacity: '1' },
// 	'100%': { opacity: '0' },
// })

export const transactionContent = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '90%', top: '48px', bottom: '48px' },
		tablet: { maxWidth: '480px', top: '48px', bottom: '48px' },
		desktop: { maxWidth: '480px', top: '72px', bottom: '72px' },
	}),
])

export const transactionContentSlideOutDialogContent = style([
	sprinkles({
		position: 'fixed',
		zIndex: 2,
		background: 'backgroundSecondary',
		boxShadow: 'shadowPanel',
		overflow: 'hidden',
		color: 'colorNeutral',
		height: 'vh100',
		right: 0,
		top: 0,
	}),
	{
		maxWidth: '380px',
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
				animationName: transactionSlideIn,
				animationFillMode: 'forwards',
			},
			'&[data-state="closed"]': {
				animationName: transactionSlideOut,
				animationFillMode: 'forwards',
			},
		},
	},
])

export const transactionInfoWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		alignItems: 'flex-end',
		height: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const transactionRowDotted = style([
	sprinkles({
		position: 'relative',
		borderStyle: 'dashed',
		flexGrow: 1,
		borderBottom: 1,
		borderColor: 'borderDividerSecondary',
		marginBottom: 'xsmall',
		marginX: 'medium',
	}),
	{},
])

export const transactionInfoCopyBtnWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		transform: 'translateY(4px)',
	},
])

export const transactionDetailsWrapper = style([
	sprinkles({
		position: 'relative',
		borderStyle: 'solid',
		borderTop: 1,
		borderColor: 'borderDivider',
		flexGrow: 1,
		alignItems: 'flex-start',
		paddingTop: {
			mobile: 'large',
			tablet: 'large',
		},
		marginTop: {
			mobile: 'large',
			tablet: 'large',
		},
		paddingX: {
			mobile: 'large',
			tablet: 'large',
		},
	}),
	{},
])
