/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const stakingHomeWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

globalStyle(`${stakingHomeWrapper} thead`, {
	top: '50px !important',
})

export const stakingTableMinHeightWrapper = style([
	sprinkles({}),
	{
		minHeight: '420px',
	},
])

export const stakingTableWrapper = style([
	sprinkles({
		position: 'relative',
		paddingX: {
			tablet: 'large',
		},
	}),
	{},
])
