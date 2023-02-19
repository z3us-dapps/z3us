import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'
import { style, globalStyle } from '@vanilla-extract/css'

export const accountIndexWrapper = style([
	sprinkles({
		background: 'backgroundSecondary',
		position: 'sticky',
		top: 0,
		zIndex: 1,
		display: 'flex',
		paddingX: 'xlarge',
		paddingTop: 'xlarge',
		paddingBottom: 'large',
		transition: 'slowall',
	}),
	{
		// border: '1px solid red',
		// transition: 'all 0.3s ease-out',
	},
])

export const accountIndexWrapperShadow = style([
	sprinkles({
		paddingTop: 'medium',
		paddingBottom: 'medium',
	}),
	{
		boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
		paddingBottom: vars.spacing.small,
	},
])

export const pricingText = style([
	sprinkles({
		// transition: 'slowall',
	}),
	{
		// transition: 'font-size .3s ease',
	},
])

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

export const indexAssetsWrapper = style([
	sprinkles({
		position: 'relative',
		marginX: 'xlarge',
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
		color: 'borderDivider',
	}),
	{
		boxShadow: '0 -1px 0 0',
		'::before': {
			content: '""',
			position: 'absolute',
			color: 'borderDivider',
			opacity: 0,
			transition: vars.transition.fast,
			top: 0,
			bottom: 0,
			left: `calc(${vars.spacing.medium} * -1)`,
			right: `calc(${vars.spacing.medium} * -1)`,
			pointerEvents: 'none',
			background: vars.color.lead400,
			borderRadius: vars.border.radius.medium,
			boxShadow:
				'0px 0px 0px 1px rgba(255, 255, 255, 0.15), 0px 136px 192px rgba(0, 0, 0, 0.3), 0px 50px 50px rgba(0, 0, 0, 0.25), 0px 24px 24px rgba(0, 0, 0, 0.2), 0px 12px 12px rgba(0, 0, 0, 0.15)',
		},
		selectors: {
			'&:hover': {
				// boxShadow: 'none',
			},
			'&:hover::before': {
				// opacity: 1,
			},
		},
	},
])

export const indexAssetLinkRowHover = style([
	sprinkles({}),
	{
		boxShadow: 'none',
		'::before': {
			opacity: 1,
		},
	},
])

globalStyle(`.${darkMode} ${indexAssetLinkRow} > a:hover`, {
	background: vars.color.wax500,
})

globalStyle(`${indexAssetWrapper}:first-child > a`, {
	boxShadow: 'none',
})

export const indexAssetRowOverlay = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		height: 'full',
		display: 'flex',
		alignItems: 'center',
		pointerEvents: 'none',
	}),
	{},
])

export const indexAssetCircle = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		pointerEvents: 'auto',
		borderColor: 'backgroundSecondary',
		borderStyle: 'solid',
		borderWidth: 'xsmall',
		transition: 'fast',
	}),
	{
		width: '40px',
		height: '40px',
		marginLeft: '-9px',
		selectors: {
			'&:hover': {
				borderColor: vars.color.purple500,
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
