import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const allChartWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		position: 'relative',
		paddingTop: {
			mobile: 'none',
			tablet: 'small',
		},
		paddingX: {
			mobile: 'none',
			tablet: 'none',
		},
		paddingBottom: {
			mobile: 'xsmall',
			tablet: 'none',
		},
	}),
	{},
])

export const allChartInnerWrapper = style([
	sprinkles({
		borderRadius: 'small',
		position: 'relative',
		width: 'full',
	}),
	{},
	responsiveStyle({
		tablet: {
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
		mobile: { width: '66%', aspectRatio: '8 / 5' },
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
		tablet: { display: 'flex' },
	}),
])
