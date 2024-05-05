import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const activityList = style([
	sprinkles({
		height: '100vh',
		background: 'backgroundSecondary',
		display: {
			mobile: 'block',
			tablet: 'none',
		},
	}),
	{
		minHeight: '380px',
	},
])

export const assetsHomeWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		background: 'backgroundSecondary',
	}),
])

export const accountListWrapper = style([
	sprinkles({
		display: ['none', 'block'],
	}),
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
		width: 'half',
	}),
	{
		flexBasis: '50%',
	},
])
