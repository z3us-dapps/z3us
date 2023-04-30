import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

// import { vars } from 'ui/src/components-v2/system/theme.css'

// TODO: remove, this is the card button wrapper
export const tempyy = style([
	{
		position: 'absolute',
		top: '0',
		right: '0',
		opacity: '0',
	},
])

export const accountCardWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		background: 'backgroundSecondary',
		paddingTop: 'large',
		paddingX: 'large',
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
])

export const cardWrapperAll = style([
	sprinkles({
		position: 'relative',
	}),
	responsiveStyle({
		mobile: {
			width: '100%',
			paddingBottom: '56.25%',
			height: '0px',
		},
		desktop: {
			width: '97%',
			paddingBottom: '56.25%',
			height: '0px',
		},
	}),
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
