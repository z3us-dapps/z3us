/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const accountsWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		paddingX: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
		paddingBottom: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
		paddingTop: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
		height: 'full',
	}),
	{},
])

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		width: 'full',
	}),
	{},
])

export const leftPanel = style([
	sprinkles({
		flexGrow: 1,
		flexShrink: 0,
	}),
	{},
])

export const rightPanel = style([
	sprinkles({
		display: 'flex',
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

export const rightPanelAssetType = style([
	{
		alignSelf: 'flex-start',
	},
])
