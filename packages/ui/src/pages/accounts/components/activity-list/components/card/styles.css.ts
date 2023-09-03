import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const accountCardWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		paddingTop: 'large',
		paddingX: 'large',
		paddingBottom: {
			mobile: 'large',
			tablet: 'none',
		},
	}),
	{},
	responsiveStyle({
		tablet: { background: vars.color.backgroundSecondary },
	}),
])

export const accountCardInnerWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		aspectRatio: '8 / 5',
	},
])

export const accountHeightFlexWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
	}),
	{
		margin: '0 auto',
		// height: '100px',
	},
	responsiveStyle({
		mobile: {
			maxWidth: '70%',
			// height: 'calc(100% - 50px)',
		},
		tablet: {
			maxWidth: '100%',
			height: '100%',
		},
	}),
])

export const accountCardButtonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 'large',
		zIndex: 1,
	}),
	{},

	responsiveStyle({
		mobile: {
			height: '50px',
		},
		tablet: {
			height: '80px',
		},
	}),
])
