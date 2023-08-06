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
			desktop: 'xxlarge',
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
		height: 'full',
		maxWidth: 'xxlarge',
	}),
	{
		margin: '0 auto',
	},
])

export const panelViewLeftWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		flexShrink: 0,
		flexGrow: 1,
		zIndex: 1,
	}),
	{
		width: '392px',
	},
	responsiveStyle({
		mobile: {
			width: '100%',
			flexBasis: '100%',
		},
		tablet: {
			width: '392px',
			flexBasis: '392px',
		},
	}),
])

export const panelViewRightWrapper = style([
	sprinkles({
		display: 'flex',
		flexShrink: 0,
	}),
	{},
	responsiveStyle({
		mobile: {
			width: '100%',
			flexBasis: '100%',
			position: 'sticky',
			top: 0,
		},
		tablet: {
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
