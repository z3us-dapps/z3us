/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const stakingTableWrapper = style([
	sprinkles({
		position: 'relative',
		paddingX: {
			tablet: 'large',
		},
	}),
	{},
])

export const stakingScrollAreaWrapper = style([
	sprinkles({}),
	{},
	responsiveStyle({
		mobile: {
			maxHeight: 'calc(100vh - 106px)',
		},
		tablet: { maxHeight: 'calc(100vh - 106px)' },
		desktop: { maxHeight: 'calc(100vh - 166px)' },
	}),
])

export const stakingHomeWrapper = style([
	sprinkles({
		position: 'relative',
		display: {
			mobile: 'none',
			tablet: 'block',
		},
	}),
	{},
])
