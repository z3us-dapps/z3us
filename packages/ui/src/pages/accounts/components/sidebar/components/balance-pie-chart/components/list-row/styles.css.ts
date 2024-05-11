import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'

export const allChartWrapper = style([
	sprinkles({
		position: 'relative',
		paddingTop: 'large',
		paddingX: 'large',
		paddingBottom: {
			mobile: 'large',
			tablet: 'none',
		},
	}),
	{},
])

export const allChartInnerWrapper = style([
	sprinkles({
		borderRadius: 'small',
		position: 'relative',
		background: 'backgroundPrimary',
		width: 'full',
		overflow: 'hidden',
	}),
	{
		aspectRatio: '8 / 5',
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
])

export const chartLoadingWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{
		minHeight: '200px',
	},
])

export const pieChartWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		paddingTop: 'medium',
	}),
	{},
])

export const accountsListWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		marginTop: 'small',
		paddingX: 'large',
		paddingBottom: 'medium',
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
