import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const interactionLoginWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		paddingTop: 'large',
		flexGrow: 1,
	}),
	{},
	// responsiveStyle({
	// 	mobile: { height: '48px' },
	// 	tablet: { height: '64px' },
	// }),
])

export const interactionLoginBodyWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	}),
	{},
])

export const interactionLoginBodyTextWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'xsmall',
	}),
	{},
])

export const interactionLoginBodyButtonWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		paddingTop: 'large',
	}),
	{},
])

export const interactionLoginFooterWrapper = style([
	sprinkles({
		position: 'relative',
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingTop: 'large',
	}),
	{},
])
