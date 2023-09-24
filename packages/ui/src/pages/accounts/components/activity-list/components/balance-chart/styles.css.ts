import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const allChartWrapper = style([
	sprinkles({
		position: 'relative',
		paddingTop: {
			mobile: 'medium',
			tablet: 'small',
		},
		paddingX: {
			mobile: 'none',
			tablet: 'none',
		},
		paddingBottom: {
			mobile: 'medium',
			tablet: 'medium',
		},
		borderBottom: 0,
		borderBottomStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},

	responsiveStyle({
		tablet: {
			borderBottom: 1,
		},
	}),
])

export const allChartInnerWrapper = style([
	sprinkles({
		borderRadius: 'small',
		position: 'relative',
		width: 'full',
	}),
	{},
	responsiveStyle({
		mobile: { aspectRatio: '8 / 5' },
		tablet: {
			aspectRatio: 'unset',
			background: 'unset',
		},
	}),
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
	}),
	{
		margin: '0 auto',
	},
	responsiveStyle({
		mobile: { width: '60%', aspectRatio: '8 / 5' },
		tablet: {
			display: 'flex',
			height: '230px',
			width: '100%',
			aspectRatio: 'unset',
		},
	}),
])

export const mobileHiddenWrapper = style([
	responsiveStyle({
		mobile: { display: 'none' },
	}),
])

export const cardButtonsWrapper = style([
	sprinkles({
		display: 'none',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'full',
	}),
	{},
])

export const cardButtonsWrapperVisible = style([
	{
		display: 'flex',
	},
])
