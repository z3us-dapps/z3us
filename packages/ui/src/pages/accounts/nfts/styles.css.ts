import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const tableWrapper = style([
	sprinkles({
		paddingX: {
			tablet: 'large',
		},
	}),
	{},
])

globalStyle(`${tableWrapper} table tbody tr:first-child:hover td:after`, {
	opacity: 1,
})
