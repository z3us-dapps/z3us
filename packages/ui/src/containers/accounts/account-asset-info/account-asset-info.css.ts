/* eslint-disable  @typescript-eslint/no-unused-vars */
import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

// import { vars } from 'ui/src/components/system/theme.css'

export const chartBgWrapper = style([
	sprinkles({
		position: 'relative',
		// background: 'backgroundPrimary',
	}),
	{
		height: '220px',
		width: '100%',
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

export const assetCloseBtnWrapper = style([
	sprinkles({
		display: 'flex',
		width: 'full',
		justifyContent: 'flex-end',
		paddingTop: {
			mobile: 'small',
			desktop: 'medium',
		},
		paddingX: {
			mobile: 'small',
			desktop: 'medium',
		},
	}),
])

export const assetChartBtnsWrapper = style([
	sprinkles({
		display: 'flex',
		gap: {
			mobile: 'xxsmall',
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
