import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const accountViewDropdownWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const accountViewSimpleBarWrapper = style([
	responsiveStyle({
		mobile: { maxHeight: '460px' },
		tablet: { maxHeight: '235px' },
	}),
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
		mobile: { width: '180px' },
		tablet: { width: '220px' },
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

export const accountViewPaddingXWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		paddingX: 'small',
	}),
	{},
])
