import { globalStyle, keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const fadeInOutAnimation = keyframes({
	'0%': { opacity: '1.0' },
	'50%': { opacity: '0.7' },
	'100%': { opacity: '1.0' },
})

export const ellipsisAnimation = keyframes({
	'0%': { opacity: '0' },
	'50%': { opacity: '1.0' },
	'100%': { opacity: '0' },
})

export const loadingBgWrapper = style([
	sprinkles({
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		width: 'full',
	}),
])

export const loadingBrandWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		gap: 'small',
	}),
	{
		animationDuration: '3000ms',
		animationName: fadeInOutAnimation,
		animationIterationCount: 'infinite',
	},
])

export const unlockOuterWrapper = style([
	sprinkles({
		position: 'relative',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		width: 'full',
	}),
	responsiveStyle({
		mobile: { backgroundColor: vars.color.backgroundSecondary },
		tablet: { backgroundColor: vars.color.backgroundPrimary },
	}),
])

export const unlockZ3usLogoWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		paddingBottom: {
			mobile: 'none',
			tablet: 'xlarge',
		},
	}),
])

export const unlockInnerWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	responsiveStyle({
		tablet: {
			borderRadius: vars.border.radius.xlarge,
			background: vars.color.backgroundSecondary,
			boxShadow: vars.color.shadowPanel,
			maxWidth: '560px',
		},
		desktop: {},
	}),
])

export const unlockPaddingWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: {
			mobile: 'xlarge',
		},
		paddingBottom: {
			tablet: 'xlarge',
		},
		paddingX: {
			mobile: 'xlarge',
		},
	}),
])

export const unlockFormWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
	}),
])

export const unlockFormTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		paddingTop: {
			mobile: 'large',
		},
	}),
])

export const unlockFormWalletWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		paddingTop: {
			mobile: 'large',
		},
	}),
])

export const unlockValidationWrapper = style([
	sprinkles({
		paddingY: {
			mobile: 'small',
		},
	}),
])

export const unlockButtonsWrapper = style([
	sprinkles({
		display: 'flex',
		gap: 'medium',
	}),
])

globalStyle(`${unlockButtonsWrapper} > button:first-child`, {
	flexGrow: '1',
})

export const ellipsisTextWrapper = style([
	sprinkles({
		display: 'none',
	}),
	{
		marginTop: '16px',
		marginLeft: '-2px',
	},
])

export const ellipsisWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		gap: '0.3em',
	},
])

export const ellipsisElement = style([
	sprinkles({
		borderRadius: 'full',
		opacity: 0,
	}),
	{
		backgroundColor: 'currentColor',
		width: '0.2em',
		height: '0.2em',
		animationDuration: '1000ms',
		animationName: ellipsisAnimation,
		animationIterationCount: 'infinite',
	},
])

globalStyle(`${ellipsisWrapper} > ${ellipsisElement}:nth-child(1)`, {
	animationDelay: '0.0s',
})

globalStyle(`${ellipsisWrapper} > ${ellipsisElement}:nth-child(2)`, {
	animationDelay: '0.1s',
})

globalStyle(`${ellipsisWrapper} > ${ellipsisElement}:nth-child(3)`, {
	animationDelay: '0.2s',
})
