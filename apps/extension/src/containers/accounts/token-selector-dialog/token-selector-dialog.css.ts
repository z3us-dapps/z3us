import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components-v2/system/theme-utils'

export const tokenSelectorHeaderWrapper = style([
	sprinkles({
		position: 'sticky',
		top: 0,
		width: 'full',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 'large',
		padding: 'large',
		background: {
			lightMode: 'backgroundSecondary',
			darkMode: 'backgroundPrimary',
		},
		borderTopLeftRadius: 'large',
		borderTopRightRadius: 'large',
		borderStyle: 'solid',
		borderBottom: 1,
		borderColor: 'borderDivider',
		transition: 'fast',
		zIndex: 1,
	}),
	{},
	// responsiveStyle({
	// 	mobile: { height: '48px' },
	// 	tablet: { height: '64px' },
	// }),
])

export const tokenSelectorHeaderWrapperShadow = style([
	sprinkles({
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const searchElement = style([
	sprinkles({
		width: 'full',
	}),
	{},
])

export const tokenSelectorContent = style([
	{},
	responsiveStyle({
		mobile: { maxWidth: '90%', top: '48px', bottom: '48px' },
		tablet: { maxWidth: '480px', top: '48px', bottom: '48px' },
		desktop: { maxWidth: '480px', top: '72px', bottom: '72px' },
	}),
])
