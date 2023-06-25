import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const landingWrapper = style([
	sprinkles({
		display: 'block',
	}),
	{
		minHeight: '100vh',
		minWidth: '100vw',
	},
])

export const landingBodyWrapper = style([
	sprinkles({
		display: 'block',
	}),
	{
		minHeight: 'calc(100vh - 70px)',
	},
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
