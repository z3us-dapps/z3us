/* eslint-disable  @typescript-eslint/no-unused-vars */
import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

// import { vars } from 'ui/src/components-v2/system/theme.css'
// paddingTop="large" paddingX="large"
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
		padding: 'large',
		background: 'backgroundPrimary',
		width: 'full',
	}),
	{
		height: '400px',
	},
])

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
