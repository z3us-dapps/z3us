/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const assetsList = style([
	sprinkles({
		marginTop: {
			tablet: 'large',
		},
		paddingX: {
			tablet: 'medium',
		},
		padding: 'none',
		display: 'flex',
		flexDirection: 'column',
		paddingBottom: {
			tablet: 'xlarge',
		},
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
		paddingX: {
			mobile: 'large',
			tablet: 'large',
		},
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		textDecoration: 'none',
		transition: 'fast',
		width: 'full',
		background: { lightMode: 'btnTertiaryBackground', hover: 'btnTertiaryBackgroundHover' },

		// background: vars.color.bai_pearl600,
		// background: vars.color.lead400,
	}),
	{
		height: '88px',
		selectors: {
			[`&:hover`]: {
				zIndex: 1,
			},
		},
		':after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			backgroundColor: vars.color.borderDivider,
			pointerEvents: 'none',
			height: '1px',
			transition: vars.transition.fast,
		},
	},
	responsiveStyle({
		mobile: {},
		tablet: {
			borderRadius: vars.border.radius.large,
			':after': {
				left: vars.spacing.large,
				right: vars.spacing.large,
			},
		},
	}),
])

export const assetsListTitleWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: 'xsmall',
	}),
	{},
])

export const assetsListTitleChevronWrapper = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		color: 'colorNeutral',
	}),
	{},
	responsiveStyle({
		tablet: {
			display: 'none',
		},
	}),
])

export const assetsListBalancesWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	}),
	{},
])

export const assetsListBalancesTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
		},
		gap: {
			tablet: 'xsmall',
		},
	}),
	{},
	responsiveStyle({
		mobile: {
			width: '50%',
			maxWidth: '50%',
		},
		tablet: {
			width: '60%',
			maxWidth: '60%',
		},
	}),
])

export const assetsListBalancesText = style([
	sprinkles({
		textAlign: {
			mobile: 'right',
			tablet: 'left',
		},
	}),
	{},
])

globalStyle(
	`${assetsList} ${assetsListLink}:hover`,
	responsiveStyle({
		tablet: {
			boxShadow: vars.color.shadowActivePanel,
		},
	}),
)

globalStyle(
	`${assetsList} ${assetsListLink}:hover::after`,
	responsiveStyle({
		tablet: {
			opacity: '0',
		},
	}),
)

globalStyle(
	`${assetsList} ${assetsListLink}:hover + ${assetsListLink}::after`,
	responsiveStyle({
		tablet: {
			opacity: '0',
		},
	}),
)

globalStyle(`${assetsList} a:first-child::after`, {
	opacity: 0,
})
