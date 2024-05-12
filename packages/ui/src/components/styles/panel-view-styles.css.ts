import { globalKeyframes, globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const panelViewOuterWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		paddingX: {
			tablet: 'large',
			desktop: 'xxlarge',
		},
		paddingTop: {
			tablet: 'large',
			desktop: 'xlarge',
		},
		height: 'full',
	}),
])

export const panelViewWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: {
			tablet: 'large',
			desktop: 'xlarge',
		},
		flexDirection: {
			mobile: 'column-reverse',
			tablet: 'row',
		},
		width: 'full',
		maxWidth: 'xxlarge',
	}),
	{
		margin: '0 auto',
	},
])

export const panelViewLeftWrapper = style([
	sprinkles({}),
	responsiveStyle({
		mobile: {
			background: vars.color.backgroundSecondary,
			width: '100%',
			flexBasis: '100%',
			zIndex: 1,
		},
		tablet: {
			minHeight: 'unset !important',
			background: 'none',
			width: '392px',
			flexBasis: '392px',
			display: 'flex',
			position: 'relative',
			flexShrink: 0,
			flexGrow: 1,
		},
	}),
])

export const panelViewResourceWrapper = style([
	sprinkles({}),
	responsiveStyle({
		mobile: {
			display: 'none',
		},
	}),
])

export const panelViewRightWrapper = style([
	sprinkles({
		position: 'sticky',
	}),
	responsiveStyle({
		mobile: {
			top: '0',
			width: '100%',
			flexBasis: '100%',
			flexShrink: 0,
		},
		tablet: {
			display: 'flex',
			width: '40%',
			flexBasis: '40%',
			position: 'relative',
		},
		desktop: {
			width: '392px',
			flexBasis: '392px',
		},
	}),
])

export const panelViewRightRelativeWrapper = style([
	sprinkles({}),
	responsiveStyle({
		mobile: {
			position: 'relative',
		},
		tablet: {
			display: 'flex',
		},
	}),
])

export const panelViewRightScrollWrapper = style([
	sprinkles({}),
	responsiveStyle({
		mobile: {
			aspectRatio: '8 / 5.3',
		},
		tablet: {
			aspectRatio: 'unset',
		},
	}),
])

export const panelViewMobileScrollWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	responsiveStyle({
		mobile: {
			width: '100%',
			height: '100%',
		},
		tablet: {
			width: '100%',
			height: '100%',
		},
	}),
])

export const panelViewMobileScrollOnboardingWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	responsiveStyle({
		mobile: {
			width: '100%',
			height: '100vh',
		},
		tablet: {
			width: '100%',
			height: '100%',
		},
	}),
])
