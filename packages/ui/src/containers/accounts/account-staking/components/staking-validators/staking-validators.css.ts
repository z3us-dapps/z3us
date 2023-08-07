/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const stakingValidatorsWrapper = style([
	sprinkles({
		paddingX: 'large',
	}),
	{},
])

export const stakingValidatorsHeaderWrapper = style([
	sprinkles({
		// position: 'sticky',
		background: 'backgroundSecondary',
		paddingTop: 'xlarge',
		paddingBottom: 'large',
		paddingX: 'medium',
		// zIndex: 1,
	}),
	{
		top: '0px',
	},
])

export const stakingValidatorsTableMinHeightWrapper = style([
	sprinkles({}),
	{
		minHeight: '100vh',
	},
])
