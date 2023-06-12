import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

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

export const transactionContent = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '90%', top: '48px', bottom: '48px' },
		tablet: { maxWidth: '480px', top: '48px', bottom: '48px' },
		desktop: { maxWidth: '480px', top: '72px', bottom: '72px' },
	}),
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
			tablet: 'xlarge',
		},
		marginTop: {
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
