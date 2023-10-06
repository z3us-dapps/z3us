import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const assetsHomeWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		background: 'backgroundSecondary',
	}),
	{},
	// responsiveStyle({
	// 	mobile: {
	// 		borderTopLeftRadius: vars.border.radius.xxxlarge,
	// 		borderTopRightRadius: vars.border.radius.xxxlarge,
	// 	},
	// 	tablet: {
	// 		borderTopLeftRadius: 0,
	// 		borderTopRightRadius: 0,
	// 	},
	// }),
])

export const homeAssetsTitleWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		alignItems: 'center',
		gap: 'small',
		paddingTop: {
			tablet: 'xlarge',
		},
		paddingX: {
			tablet: 'xlarge',
		},
	}),
	{},
])

export const assetTileWrapper = style([
	sprinkles({
		display: 'flex',
		paddingTop: 'large',
		paddingBottom: 'xlarge',
		gap: 'large',
		paddingX: {
			tablet: 'xlarge',
		},
	}),
])

export const assetTile = style([
	sprinkles({
		padding: 'large',
		border: 1,
		borderStyle: 'solid',
		borderRadius: 'large',
		borderColor: 'borderDivider',
	}),
	{
		width: '50%',
		flexBasis: '50%',
	},
])
