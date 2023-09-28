import { globalKeyframes, globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

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
	{},
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
	{},
	responsiveStyle({
		mobile: {
			width: '100%',
			flexBasis: '100%',
			zIndex: 1,
		},
		tablet: {
			width: '392px',
			flexBasis: '392px',
			display: 'flex',
			position: 'relative',
			flexShrink: 0,
			flexGrow: 1,
		},
	}),
])

export const panelViewRightWrapper = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: {
			position: 'sticky',
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

export const panelViewRightScrollWrapper = style([
	sprinkles({}),
	{},
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
	{},
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
