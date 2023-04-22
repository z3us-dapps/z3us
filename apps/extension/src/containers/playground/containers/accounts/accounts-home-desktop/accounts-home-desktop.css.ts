/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: 'xlarge',
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
