import { style } from '@vanilla-extract/css'

import { sprinkles } from '../system/sprinkles.css'

export const checkboxWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		border: 1,
		borderStyle: 'solid',
		borderColor: 'borderDividerSecondary',
		borderRadius: 'xsmall',
		background: {
			lightMode: 'bai_pearl200',
			darkMode: 'backgroundPrimary',
		},
	}),
	{
		outline: 'none',
		width: '24px',
		height: '24px',
	},
])

export const checkboxIndicator = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
])
