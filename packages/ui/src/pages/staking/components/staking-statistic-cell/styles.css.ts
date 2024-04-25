/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const stakingStatisticCellWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const stakingStatisticCellContentWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		transition: 'fast',
		gap: {
			mobile: 'medium',
		},
	}),
	{},
])

export const stakingStatisticCellLoadingWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		pointerEvents: 'none',
		transition: 'fast',
		display: 'flex',
		gap: 'medium',
		alignItems: 'center',
		opacity: 0,
	}),
	{},
])
