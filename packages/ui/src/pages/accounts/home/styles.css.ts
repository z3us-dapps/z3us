import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const assetsHomeWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
	}),
	{},
])

export const accountsHorizontalWrapper = style([
	sprinkles({
		display: 'flex',
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const accountsHorizontalCardsWrapper = style([
	sprinkles({
		display: 'flex',
		paddingX: 'xlarge',
		paddingBottom: 'xlarge',
		flexShrink: 0,
		gap: 'large',
	}),
	{
		minHeight: '100px',
	},
])

export const homeAssetsTitleWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: 'small',
		paddingTop: {
			tablet: 'xlarge',
		},
		paddingX: {
			tablet: 'xlarge',
		},
	}),
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
