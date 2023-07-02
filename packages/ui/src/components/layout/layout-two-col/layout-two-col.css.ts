import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const layoutTwoColWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		height: 'full',
		paddingX: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xxlarge',
		},
		paddingBottom: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xxlarge',
		},
		paddingTop: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xxlarge',
		},
	}),
	{},
])

export const layoutTwoColInnerWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		maxWidth: 'xxlarge',
		display: 'flex',
		gap: 'xlarge',
	}),
	{},
])

export const layoutTwoColLeftWrapper = style([
	sprinkles({
		position: 'relative',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		flexDirection: 'column',
		gap: 'medium',
		paddingLeft: {
			desktop: 'medium',
		},
		alignItems: 'self-start',
	}),
	{},
	responsiveStyle({
		tablet: { width: '20%' },
		desktop: { width: '260px' },
	}),
])

export const layoutTwoColRightWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
	}),
	{},
])
