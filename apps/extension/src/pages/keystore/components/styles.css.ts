import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

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
		flexDirection: 'column',
		justifyContent: 'center',
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
		height: 'full',
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
