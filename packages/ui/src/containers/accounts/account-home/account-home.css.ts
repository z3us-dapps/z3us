/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const accountsWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		paddingX: {
			tablet: 'large',
			desktop: 'xxlarge',
		},
		paddingBottom: {
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

export const accountsContainerWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		maxWidth: 'xxlarge',
	}),
	{},
])

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: {
			tablet: 'large',
			desktop: 'xlarge',
		},
		width: 'full',
		height: 'full',
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
		},
	}),
	{},
])

export const leftPanel = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
		flexShrink: 0,
	}),
	{},
	// responsiveStyle({
	// 	mobile: {
	// 		background: '#8A4AE1',
	// 	},
	// }),
])

export const rightPanel = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		flexDirection: 'column',
		flexShrink: 0,
		overflow: 'clip',
	}),
	{
		width: '392px',
		flexBasis: '392px',
	},
	responsiveStyle({
		tablet: {
			width: '40%',
			flexBasis: '40%',
		},
		desktop: {
			width: '392px',
			flexBasis: '392px',
		},
	}),
])
