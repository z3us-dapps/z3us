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
		flexDirection: {
			mobile: 'column-reverse',
			tablet: 'row',
		},
		width: 'full',
		height: 'full',
	}),
	{
		border: '1px solid blue',
	},

	responsiveStyle({
		tablet: {
			height: 'calc(100vh - 168px)',
			// maxHeight: 'calc(100vh - 168px)',
		},
	}),
])

export const scrollWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		// height: '500px',
		// maxHeight: '500px',
		border: '1px solid red',
		// maxHeight: '100px',
	},
	responsiveStyle({
		tablet: {
			maxHeight: 'calc(100vh - 168px)',
			// maxHeight: 'calc(100vh - 168px)',
			width: '90%',
		},
	}),
])

export const leftPanelWrapper = style([
	sprinkles({
		display: 'flex',
		flexShrink: 0,
		flexGrow: 1,
	}),
	{
		width: '392px',
		background: 'pink',
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

export const rightPanelWrapper = style([
	sprinkles({
		display: 'flex',
		// display: {
		// 	mobile: 'none',
		// 	tablet: 'flex',
		// },
		flexShrink: 0,
	}),
	{
		background: 'blue',
	},
	responsiveStyle({
		mobile: {
			width: '100%',
			flexBasis: '100%',
		},
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

export const mobileScrollWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		// width: '600px',
		// height: 'calc(100vh - 170px)',
		// height: 'calc(50vh -1px)',
		// border: '1px solid blue',
	},
	responsiveStyle({
		mobile: {
			width: '100%',
			height: 'calc(100vh - 106px)',
		},
		tablet: {
			width: '100%',
			height: '100%',
		},
	}),
])
