import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const mobileMenuWrapper = style([
	sprinkles({
		display: {
			mobile: 'block',
			tablet: 'none',
		},
		paddingX: 'medium',
		width: 'full',
	}),
	{},
])

export const tabletMenuWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'block',
		},
	}),
	{},
])

export const accountViewContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	responsiveStyle({
		mobile: { width: '100%' },
	}),
])

export const accountViewTriggerButton = style([
	sprinkles({
		position: 'relative',
	}),
])

export const accountViewPaddingWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		paddingY: 'small',
		paddingX: 'small',
	}),
	{},
])
