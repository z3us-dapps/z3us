import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { vars } from 'ui/src/components-v2/system/theme.css'

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
	{
		height: '86px',
	},
])

export const indexAssetLinkRowLoadingGrid = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'grid',
	}),
	{
		gap: '1rem',
		gridTemplateColumns: '1fr 304px',
	},
])

export const indexAssetLinkRowLoading = style([
	sprinkles({
		transition: 'fast',
		display: 'flex',
		alignItems: 'center',
		width: 'full',
	}),
	{
		height: '86px',
	},
])

export const indexAssetLinkRow = style([
	sprinkles({
		width: 'full',
		color: 'borderDivider',
		transition: 'fast',
	}),
	{
		boxShadow: '0 -1px 0 0',
		'::before': {
			content: '""',
			position: 'absolute',
			transition: vars.transition.fast,
			top: 0,
			opacity: 0,
			bottom: 0,
			left: `calc(${vars.spacing.medium} * -1)`,
			right: `calc(${vars.spacing.medium} * -1)`,
			pointerEvents: 'none',

			// TODO: fix needing to make these a string
			boxShadow: `${vars.color.shadowActivePanel}`,
			color: `${vars.color.borderDivider}`,
			borderRadius: vars.border.radius.medium,
			background: vars.color.bleached_silk300,
		},
		selectors: {
			[`.${darkMode} &::before`]: {
				background: vars.color.lead400,
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

export const indexAssetLinkRowInner = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
	}),
	{
		paddingTop: '24px',
		paddingBottom: '24px',
	},
	responsiveStyle({
		// mobile: { width: '100%' },
		// tablet: { width: '33%' },
		// desktop: { width: '25%' },
	}),
])

export const teststyle = style([
	sprinkles({
		position: 'relative',
		background: {
			hover: 'red800',
			focus: 'red900',
		},
	}),
	{
		border: '1px solid red',
		'@media': {
			[`screen and (min-width: 480px)`]: {
				flexBasis: '50%',
			},
		},
	},
	responsiveStyle({
		mobile: { width: '100%' },
		tablet: { width: '33%' },
		desktop: { width: '25%' },
	}),
])

globalStyle(`.${darkMode} ${indexAssetLinkRow} > a:hover`, {
	background: vars.color.wax500,
})

globalStyle(`${indexAssetWrapper}:first-child > div > div > a`, {
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
	{},
])
