import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const scrollOuterWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
	}),
	{},
	responsiveStyle({
		mobile: { height: '300px' },
		tablet: { height: '400px' },
	}),
])

export const scrollAbsoluteWrapper = style([
	sprinkles({
		width: 'full',
		height: 'full',
		position: 'absolute',
	}),
	{},
])

export const scrollWrapper = style([
	sprinkles({
		border: 1,
		borderStyle: 'solid',
		borderRadius: 'small',
		borderColor: 'borderDivider',
		background: 'backgroundSecondary',
		padding: 'medium',
		width: 'full',
		height: 'full',
	}),
	{},
])

export const textWrapper = style([
	sprinkles({}),
	{
		fontFamily: vars.fonts.code,
		whiteSpace: 'pre',
		wordWrap: 'break-word',
	},
])

export const copyButton = style([
	sprinkles({}),
	{
		position: 'absolute',
		top: '5px',
		right: '5px',
	},
])
