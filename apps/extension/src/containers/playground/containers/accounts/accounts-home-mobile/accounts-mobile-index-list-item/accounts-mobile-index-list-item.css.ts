import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const mobileAccountsListItem = style([
	sprinkles({
		width: 'full',
		position: 'relative',
		background: 'backgroundSecondary',
		borderTop: 1,
		borderColor: 'borderDivider',
		borderStyle: 'solid',
	}),
	{
		height: '94px',
	},
])

export const itemWrapperMotion = style([
	sprinkles({
		width: 'full',
		position: 'relative',
	}),
])

export const mobileAccountsListItemInner = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		height: 'full',
		display: 'flex',
		flexDirection: 'column',
		paddingX: 'medium',
		paddingY: 'medium',
	}),
	{},
])
