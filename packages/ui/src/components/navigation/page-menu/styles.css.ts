import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'

export const navigationWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		borderBottom: {
			mobile: 1,
			tablet: 0,
		},
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingBottom: {
			mobile: 'large',
			tablet: 'none',
		},
	}),
])

export const mobileMenuWrapper = style([
	sprinkles({
		display: {
			mobile: 'block',
			tablet: 'none',
		},
		paddingX: {
			mobile: 'large',
			tablet: 'medium',
		},
		width: 'full',
	}),
])

export const tabletMenuWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'block',
		},
	}),
])

export const accountViewContentWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		paddingTop: 0,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
	},
	responsiveStyle({
		mobile: { width: '100%' },
	}),
])

export const accountViewTriggerButton = style([
	sprinkles({
		position: 'relative',
	}),
])

export const accountViewPaddingWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		paddingY: 'small',
		paddingX: 'small',
	}),
])

export const menuTitleWrapper = style([
	sprinkles({
		paddingBottom: 'small',
	}),
])
