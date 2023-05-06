import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const transferWrapper = style([
	sprinkles({
		padding: {
			mobile: 'medium',
			tablet: 'xlarge',
			desktop: 'xxlarge',
		},
	}),
	{},
])

export const transferFlexColWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		gap: 'large',
	}),
	{},
])

export const transferUiTextSeperator = style([
	sprinkles({
		height: 'medium',
		background: 'borderDividerSecondary',
	}),
	{
		width: '1px',
	},
])
