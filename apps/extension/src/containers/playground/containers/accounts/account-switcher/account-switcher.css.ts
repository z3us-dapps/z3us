import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

// import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'
// import { vars } from 'ui/src/components-v2/system/theme.css'

// TODO: remove
export const tempyy = style([
	{
		position: 'absolute',
		top: '0',
		right: '0',
		opacity: '0',
		// display: 'none',
	},
])

export const accountCardWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		background: 'backgroundSecondary',
		paddingTop: 'large',
		paddingX: 'large',
		borderBottom: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
	}),
	{},
])

export const tempBg = style([
	sprinkles({
		background: 'backgroundPrimary',
		padding: 'large',
	}),
	{
		height: '160px',
		width: '100%',
	},
	// responsiveStyle({
	// 	mobile: { width: '100%' },
	// 	tablet: { width: '33%' },
	// 	desktop: { width: '25%' },
	// }),
])

export const cardWrapperAll = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '344px',
		height: '200px',
	},
])

export const tempNav = sprinkles({
	position: 'fixed',
	bottom: 0,
	right: 0,
	zIndex: 1,
})

export const accountCardButtonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: 'large',
		marginY: 'large',
		zIndex: 1,
	}),
])
