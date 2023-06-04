/* eslint-disable  @typescript-eslint/no-unused-vars */

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { globalStyle, style } from '@vanilla-extract/css'

import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
import { vars } from 'ui/src/components-v2/system/theme.css'


export const allChartWrapper = style([
	sprinkles({
		paddingTop: 'large',
		paddingX: 'large',
	}),
	{},
])

export const allChartInnerWrapper = style([
	sprinkles({
		borderRadius: 'small',
		background: 'backgroundPrimary',
		width: 'full',
	}),
	{
		// todo, will by dymanic height based on accounts
		height: '400px',
	},
])

globalStyle(`${allChartInnerWrapper} .recharts-layer.recharts-pie-sector path:focus`, {
	outline: 'none !important',
})

globalStyle(`${allChartInnerWrapper} .recharts-layer.recharts-pie-sector path`, {
	transition: 'all 0.3s ease-out',
})

export const motionWrapper = style([
	sprinkles({
		height: 'full',
	}),
	{},
])

export const accountsListWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		marginTop: 'small',
		paddingX: 'large',
	}),
	{},
])

export const accountDotBg = style([
	sprinkles({
		borderRadius: 'full',
		width: 'small',
		height: 'small',
		flexShrink: 0,
		marginRight: 'small',
	}),
	{
		background: 'grey',
	},
])

export const addressInfoWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		width: 'full',
		alignItems: 'center',
		height: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const addressInfoWrapperLeft = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		alignItems: 'flex-end',
	}),
	{
		maxWidth: '150px',
	},
])

export const addressInfoWrapperRight = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
	}),
	{
		maxWidth: '100px',
	},
])

export const dottedSpacer = style([
	sprinkles({
		position: 'relative',
		borderStyle: 'dashed',
		flexGrow: 1,
		borderBottom: 1,
		borderColor: 'borderDividerSecondary',
		marginTop: 'small',
		marginX: 'small',
	}),
	{},
])
