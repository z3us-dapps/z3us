import { globalStyle, style } from '@vanilla-extract/css'

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
			desktop: 'xlarge',
		},
		paddingTop: {
			mobile: 'none',
			tablet: 'large',
			desktop: 'xlarge',
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
		flexDirection: {
			mobile: 'column',
			tablet: 'row',
		},
		gap: {
			mobile: 'xsmall',
			tablet: 'xlarge',
		},
	}),
	{},
])

export const layoutTwoColLeftWrapper = style([
	sprinkles({
		position: 'relative',
		display: {
			mobile: 'flex',
			tablet: 'flex',
		},
		flexDirection: 'column',
		gap: 'medium',
		paddingLeft: {
			desktop: 'medium',
		},
		paddingTop: {
			tablet: 'xlarge',
			desktop: 'xxlarge',
		},
		alignItems: 'self-start',
		flexShrink: 0,
	}),
	{},
	responsiveStyle({
		tablet: { width: '20%' },
		desktop: { width: '260px' },
	}),
])

globalStyle(`${layoutTwoColLeftWrapper} ul`, {
	listStyleType: 'none',
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
})

export const layoutTwoColRightWrapper = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
	}),
	{},
	responsiveStyle({
		desktop: { maxWidth: '820px' },
	}),
])
