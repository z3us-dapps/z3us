/* eslint-disable @typescript-eslint/no-unused-vars */
import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
// import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
// import { vars } from 'ui/src/components-v2/system/theme.css'
import { style, globalStyle } from '@vanilla-extract/css'

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: 'xlarge',
		// display: 'grid',
		width: 'full',
	}),
	{
		// gridTemplateColumns: '1fr 392px ',
		// gridGap: vars.spacing.xlarge,
		// gridAutoRows: '1fr',
		// TODO: get calculation going here for maxheight
		// maxHeight: '80vh',
		// border: '1px solid red',
	},
])

export const leftPanel = style([
	sprinkles({
		flexGrow: 1,
		flexShrink: 0,
	}),
	{
		// alignSelf: 'flex-start',
		// overflow: 'auto',
	},
])

export const rightPanel = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		// flexGrow: 1,
		flexShrink: 0,
		// overflow: 'auto',
	}),
	{
		// TODO: conditional align self for tokens pages
		// alignSelf: 'flex-start',
		width: '392px',
		flexBasis: '392px',
		// maxHeight: '100%',
	},
])

export const rightPanelAssetType = style([
	{
		// TODO: conditional align self for tokens pages
		alignSelf: 'flex-start',
		// maxHeight: '100%',
	},
])

export const recentActivityWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		// '::before': {
		// 	content: '""',
		// 	position: 'absolute',
		// 	top: 0,
		// 	left: 0,
		// 	right: 0,
		// 	height: '150px',
		// 	pointerEvents: 'none',
		// 	background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 65%, rgba(0,0,0,0) 100%)',
		// },
	},
])
