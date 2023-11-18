import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const accountsStickyWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		flexDirection: 'column',
		gap: 'small',
		background: 'backgroundSecondary',
		position: 'sticky',
		top: 0,
		zIndex: 2,
		paddingX: {
			tablet: 'xlarge',
		},
		paddingTop: {
			tablet: 'xlarge',
		},
		paddingBottom: {
			tablet: 'large',
		},
	}),
	{},
])

export const outletTabletWrapper = style([
	sprinkles({
		background: 'backgroundSecondary',
		display: {
			mobile: 'none',
			tablet: 'block',
		},
	}),
	{
		minHeight: '600px',
	},
])

export const outletMobileWrapper = style([
	sprinkles({
		background: 'backgroundSecondary',
		display: {
			mobile: 'block',
			tablet: 'none',
		},
	}),
	{
		minHeight: '380px',
	},
])
