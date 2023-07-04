import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const landingWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		width: 'vw100',
		maxWidth: 'full',
	}),
	{},
	responsiveStyle({
		mobile: { minHeight: 'calc(100vh - 58px)' },
		tablet: { minHeight: 'calc(100vh - 70px)' },
	}),
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
