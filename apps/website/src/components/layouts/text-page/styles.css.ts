import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const textPageContentWrapper = style([
	sprinkles({
		paddingY: {
			mobile: 'xxlarge',
			tablet: 'xxlarge',
		},
	}),
	{},
])

export const textPageFooterWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		marginTop: 'xlarge',
		paddingTop: {
			mobile: 'large',
			tablet: 'none',
		},
		borderTop: 1,
		borderColor: 'lead800',
		borderStyle: 'solid',
	}),
	{},
])
