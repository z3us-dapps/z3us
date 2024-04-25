import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const accountViewDropdownWrapper = style([
	sprinkles({
		position: 'relative',
		flexShrink: 0,
	}),
	{},
])

export const accountViewSimpleBarWrapper = style([
	responsiveStyle({
		mobile: { maxHeight: '460px' },
		tablet: { maxHeight: '235px' },
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
		mobile: { width: '220px' },
		tablet: { width: '280px' },
	}),
])

export const accountViewPaddingWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		paddingY: 'small',
		paddingX: 'small',
	}),
	{},
])

export const accountDappLinkSeparator = style([
	sprinkles({}),
	{
		marginTop: vars.spacing.xxsmall,
		marginBottom: vars.spacing.xxsmall,
	},
])

export const accountViewPaddingXWrapper = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		paddingX: 'small',
	}),
	{},
])

export const accountMenuIconWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}),
	{
		width: '24px',
		height: '24px',
	},
])
