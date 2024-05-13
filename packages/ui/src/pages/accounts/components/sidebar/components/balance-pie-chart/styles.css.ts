import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const allChartWrapper = style([
	sprinkles({
		position: 'relative',
		paddingTop: 'small',
		paddingBottom: 'small',
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

globalStyle(`${pieChartWrapper} .recharts-layer.recharts-pie-sector path:focus`, {
	outline: 'none !important',
})

globalStyle(`${pieChartWrapper} .recharts-layer.recharts-pie-sector path`, {
	transition: 'all 0.3s ease-out',
})
