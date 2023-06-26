import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const landingWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
	}),
	{
		minHeight: 'calc(100vh - 71px)',
		minWidth: '100vw',
	},
])

export const landingBodyWrapper = style([
	sprinkles({
		display: 'block',
		paddingTop: 'large',
		flexGrow: 1,
	}),
	{},
])

export const landingFooterWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		paddingTop: 'large',
		paddingBottom: 'large',
	}),
	{},
])
