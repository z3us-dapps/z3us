import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'
import { style, globalStyle } from '@vanilla-extract/css'

export const panelWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'grid',
	}),
	{
		gridTemplateColumns: '1fr 392px ',
		gridGap: vars.spacing.xlarge,
		gridAutoRows: '1fr',
	},
])

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
		// TODO: conditional align self for tokens pages
		// alignSelf: 'flex-start',
		maxHeight: '100%',
	},
])

export const rightPanelAssetType = style([
	{
		// TODO: conditional align self for tokens pages
		alignSelf: 'flex-start',
		// maxHeight: '100%',
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

export const recentActivityWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		'::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			height: '150px',
			pointerEvents: 'none',
			background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 65%, rgba(0,0,0,0) 100%)',
		},
	},
])
