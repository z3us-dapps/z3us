import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

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
		height: 'vh100',
		width: 'full',
	}),
	{},
])

export const keystoreOuterFlexWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		paddingX: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xxlarge',
		},
		paddingTop: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xlarge',
		},
		paddingBottom: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xlarge',
		},
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
			tablet: 'xxlarge',
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
		tablet: { maxHeight: 'calc(100vh - 246px)' },
	}),
])
