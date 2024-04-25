import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const unlockOuterWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		width: 'full',
	}),
	{},
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
	{},
])

export const unlockInnerWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
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
	{},
])

export const unlockFormWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
	}),
	{},
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
	{},
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
	{},
])

export const unlockValidationWrapper = style([
	sprinkles({
		paddingY: {
			mobile: 'small',
		},
	}),
	{},
])
