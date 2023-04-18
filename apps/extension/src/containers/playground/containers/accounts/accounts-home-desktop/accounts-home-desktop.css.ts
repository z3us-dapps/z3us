/* eslint-disable @typescript-eslint/no-unused-vars */
// import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
// import { vars } from 'ui/src/components-v2/system/theme.css'
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

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
	{},
])

export const rightPanel = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		// flexGrow: 1,
		flexShrink: 0,
		overflow: 'clip',
		// overflow: 'auto',
	}),
	{
		// TODO: conditional align self for tokens pages
		// alignSelf: 'flex-start',
		width: '392px',
		flexBasis: '392px',
	},
])

export const rightPanelAssetType = style([
	{
		alignSelf: 'flex-start',
	},
])
