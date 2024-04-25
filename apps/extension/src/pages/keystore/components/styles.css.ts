import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const keystoreNewTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
		paddingTop: 'small',
		paddingBottom: 'large',
	}),
	{},
])

export const onboardingNavWrapper = style([
	sprinkles({
		position: 'relative',
		justifyContent: 'center',
		paddingY: {
			mobile: 'large',
		},
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
	}),
	{},
])

export const keystoreOuterWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
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

export const keystoreOuterFlexWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		width: 'full',
	}),
	{},
])

export const keystoreFlexWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		justifyContent: 'center',
	}),
	{},
])

export const keystoreInnerWrapper = style([
	sprinkles({
		padding: {
			mobile: 'none',
			tablet: 'large',
		},
		paddingBottom: {
			mobile: 'none',
			tablet: 'xxxlarge',
		},
	}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '600px', width: '100%' },
	}),
])

export const keystoreInnerScrollPanelWrapper = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { minHeight: '600px' },
		tablet: { minHeight: 'unset', maxHeight: 'calc(100vh - 246px)' },
	}),
])
