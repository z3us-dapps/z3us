/* eslint-disable @typescript-eslint/no-unused-vars */
import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

// import { vars } from 'ui/src/components-v2/system/theme.css'

export const settingsHeaderLogoWrapper = style([
	sprinkles({
	}),
	{},
])

export const settingsMobileHeaderWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		display: 'flex',
		alignItems: 'center',
		background: 'backgroundPrimary',
		paddingX: 'small',
		transition: 'fast',
	}),
	{
		height: '48px',
	},
])

export const settingsMobileHeaderWrapperShadow = style([
	sprinkles({
		background: 'backgroundPrimary',
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const settingsMiddleSlotWrapper = style([
	sprinkles({
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'center',
	}),
	{},
])
