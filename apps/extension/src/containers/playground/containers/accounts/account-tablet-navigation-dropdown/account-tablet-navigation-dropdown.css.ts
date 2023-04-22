import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const accountViewDropdownWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const accountViewSimpleBarWrapper = style([
	responsiveStyle({
		mobile: { maxHeight: '460px' },
		tablet: { maxHeight: '70vh' },
	}),
])

export const accountViewContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		minWidth: '160px',
	},
	responsiveStyle({
		mobile: { minWidth: '220px' },
		tablet: { minWidth: '220px' },
	}),
])

export const accountViewScrollAreaWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		height: 'full',
		paddingY: 'small',
		paddingX: 'small',
	}),
	{},
])
