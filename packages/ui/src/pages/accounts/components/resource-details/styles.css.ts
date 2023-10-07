/* eslint-disable  @typescript-eslint/no-unused-vars */
import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

// import { vars } from 'ui/src/components/system/theme.css'

export const assetInfoWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 'xlarge',
		paddingX: 'xlarge',
	}),
	{},
])

export const chartBgWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{
		height: '220px',
	},
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
			mobile: 'xxsmall',
			tablet: 'small',
			desktop: 'small',
		},
		paddingTop: {
			mobile: 'small',
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

export const tokenSummaryWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		width: 'full',
		borderTop: 1,
		borderTopStyle: 'solid',
		borderColor: 'borderDivider',
		paddingX: {
			mobile: 'small',
			tablet: 'large',
		},
		paddingTop: {
			mobile: 'small',
			tablet: 'xlarge',
		},
		paddingBottom: {
			mobile: 'small',
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
