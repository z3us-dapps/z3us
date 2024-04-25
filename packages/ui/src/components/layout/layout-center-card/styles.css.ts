import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const layoutCenterCardWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		width: 'full',
	}),
	{},
	responsiveStyle({
		mobile: { backgroundColor: vars.color.backgroundSecondary },
		tablet: { backgroundColor: vars.color.backgroundPrimary },
	}),
])

export const layoutCenterCardInnerWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
	}),
	{},
	responsiveStyle({
		tablet: {
			borderRadius: vars.border.radius.xlarge,
			background: vars.color.backgroundSecondary,
			boxShadow: vars.color.shadowPanel,
			maxWidth: '560px',
		},
		desktop: {},
	}),
])

export const layoutCenterCardTextWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
		padding: 'xlarge',
	}),
	{},
])

export const layoutCenterCardButtonWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: 'xlarge',
	}),
	{},
])
