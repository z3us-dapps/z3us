import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const accountViewDropdownWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const accountViewContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		minWidth: '200px',
	},
	responsiveStyle({
		mobile: { maxHeight: '400px', minWidth: '220px' },
		tablet: { maxHeight: '70vh', minWidth: '220px' },
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
