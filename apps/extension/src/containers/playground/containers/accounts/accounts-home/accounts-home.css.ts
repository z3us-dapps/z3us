import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'
import { style, globalStyle } from '@vanilla-extract/css'

export const leftPanel = style([
	sprinkles({
		position: 'relative',
	}),
	{
		alignSelf: 'flex-start',
	},
])

export const rightPanel = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		overflow: 'clip',
	}),
	{
		alignSelf: 'flex-start',
		width: '392px',
		maxHeight: '100%',
	},
])

export const indexAssetsWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const indexAssetWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const indexAssetLinkRow = style([
	sprinkles({
		width: 'full',
		background: { hover: 'btnSecondaryBackgroundHover' },
		paddingX: 'xlarge',
	}),
	{
		selectors: {
			'&:hover': {
				background: vars.color.wax500,
			},
		},
	},
])

globalStyle(`.${darkMode} ${indexAssetLinkRow} > a:hover`, {
	background: vars.color.wax500,
})

globalStyle(`${indexAssetWrapper}:first-child > a > div`, {
	borderTop: 'none',
})

export const indexAssetRowOverlay = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		height: 'full',
		display: 'flex',
		alignItems: 'center',
		paddingRight: 'xlarge',
		pointerEvents: 'none',
	}),
	{},
])

export const indexAssetCircle = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		pointerEvents: 'auto',
	}),
	{
		backgroundColor: 'orange',
		width: '40px',
		height: '40px',
		marginLeft: '-9px',
		selectors: {
			'&:hover': {
				background: vars.color.wax500,
			},
		},
	},
])
