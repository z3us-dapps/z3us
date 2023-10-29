import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const keystoreOuterWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingX: {
			tablet: 'large',
			desktop: 'xxlarge',
		},
		paddingTop: {
			tablet: 'large',
			desktop: 'xlarge',
		},
		height: 'full',
		width: 'full',
	}),
	{},
])

export const keystoreFlexWrapper = style([
	sprinkles({
		width: 'full',
		display: 'flex',
		justifyContent: 'center',
	}),
	{},
])

export const keystoreInnerWrapper = style([
	sprinkles({
		padding: 'large',
	}),
	{},
	responsiveStyle({
		mobile: { maxWidth: '600px', width: '100%' },
	}),
])
