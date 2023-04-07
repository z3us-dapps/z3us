import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { vars } from 'ui/src/components-v2/system/theme.css'

export const accountIndexWrapper = style([
	sprinkles({
		background: 'backgroundSecondary',
		position: 'sticky',
		top: 0,
		zIndex: 1,
		display: 'flex',
		paddingX: 'xlarge',
		paddingTop: 'xlarge',
		paddingBottom: 'large',
		transition: 'slowall',
	}),
])

export const accountIndexWrapperShadow = style([
	sprinkles({
		paddingTop: 'medium',
		paddingBottom: 'medium',
	}),
	{
		boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
		paddingBottom: vars.spacing.small,
	},
])
