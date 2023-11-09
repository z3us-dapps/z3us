import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const notFound404Wrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'vh100',
		width: 'full',
	}),
	{},
	responsiveStyle({
		mobile: { backgroundColor: vars.color.backgroundSecondary },
		tablet: { backgroundColor: vars.color.backgroundPrimary },
	}),
])

export const notFound404InnerWrapper = style([
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

export const notFound404TextWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		gap: 'medium',
		padding: 'xlarge',
	}),
	{},
])

export const notFound404ButtonWrapper = style([
	sprinkles({
		width: 'full',
		paddingTop: 'xlarge',
	}),
	{},
])
