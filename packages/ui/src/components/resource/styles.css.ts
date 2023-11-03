import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const tokenDetailWrapper = style([
	sprinkles({
		flexShrink: 0,
	}),
	{},
	responsiveStyle({
		mobile: { background: vars.color.backgroundPrimary },
		tablet: { background: vars.color.backgroundSecondary },
	}),
])

export const assetInfoWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: {
			mobile: 'small',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const chartBgWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
	responsiveStyle({
		mobile: { height: '160px' },
		tablet: { height: '200px' },
	}),
])

export const nftIcon = style([
	sprinkles({
		width: 'full',
		height: 'full',
	}),
	{ height: '350px', width: '350px' },
])

export const accountCardButtonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: 'large',
		marginY: 'large',
		zIndex: 1,
	}),
])

export const assetChartBtnWrapper = style([
	sprinkles({
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: {
			mobile: 'medium',
			tablet: 'small',
			desktop: 'small',
		},
		paddingTop: {
			mobile: 'medium',
			desktop: 'small',
		},
		paddingBottom: {
			mobile: 'large',
			desktop: 'xlarge',
		},
		paddingX: {
			mobile: 'small',
			desktop: 'small',
		},
	}),
])

export const tag = style([
	{
		inlineSize: 'min-content',
		flexGrow: 1,
	},
])

export const tagsWrapper = style([
	sprinkles({
		display: 'flex',
		flexWrap: 'wrap',
		gap: 'medium',
	}),
	{
		minHeight: '40px',
		justifyContent: 'space-around',
		alignContent: 'space-around',
	},
])

export const tokenSummaryWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		borderTop: 1,
		borderTopStyle: 'solid',
		borderColor: 'borderDivider',
		paddingX: {
			mobile: 'large',
			tablet: 'large',
		},
		paddingTop: {
			mobile: 'large',
			tablet: 'xlarge',
		},
		paddingBottom: {
			mobile: 'xlarge',
			tablet: 'xxlarge',
		},
	}),
	{},
])

export const tokenSummaryRightMaxWidth = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '130px' },
		tablet: { maxWidth: '130px' },
		desktop: { maxWidth: '200px' },
	}),
])

export const tokenMetaDataIconWrapper = style([
	{
		marginLeft: '-4px',
		transform: 'translateY(5px)',
	},
])
