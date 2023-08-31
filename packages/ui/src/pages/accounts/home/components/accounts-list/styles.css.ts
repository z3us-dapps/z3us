import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const assetsList = style([
	sprinkles({
		paddingX: {
			tablet: 'medium',
		},
		marginTop: {
			tablet: 'medium',
		},
		paddingBottom: {
			tablet: 'large',
		},
		display: 'flex',
		flexDirection: 'column',
	}),
	{ listStyle: 'none' },
])

export const assetsListLi = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const assetsListLink = style([
	sprinkles({
		position: 'relative',
		paddingX: 'large',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		textDecoration: 'none',
		transition: 'fast',
		borderRadius: 'large',
		width: 'full',
	}),
	{
		height: '88px',
		':after': {
			content: '""',
			position: 'absolute',
			left: vars.spacing.large,
			right: vars.spacing.large,
			top: 0,
			backgroundColor: vars.color.borderDivider,
			pointerEvents: 'none',
			height: '1px',
			transition: vars.transition.fast,
		},
	},
])

export const assetsListLinkHover = style([
	sprinkles({
		background: 'bai_pearl200',
		boxShadow: 'shadowActivePanel',
	}),
	{
		selectors: {
			[`.${darkMode} &`]: {
				background: vars.color.wax500,
			},
		},
	},
])

export const assetsListTitleWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: 'small',
	}),
	{},
])

globalStyle(`${assetsList} ${assetsListLink}:hover::after`, {
	opacity: '0',
})

globalStyle(`${assetsList} li:first-child ${assetsListLink}`, {
	marginBottom: '-1px',
})

globalStyle(`${assetsList} li:first-child ${assetsListLink}::after`, {
	display: 'none',
})
