import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const wrapper = style([
	sprinkles({
		position: 'relative',
		border: 1,
		borderStyle: 'solid',
		borderRadius: 'small',
		borderColor: 'borderDivider',
		background: 'backgroundSecondary',
		padding: 'medium',
		height: 'full',
	}),
	{
		fontFamily: vars.fonts.code,
		whiteSpace: 'pre',
		wordWrap: 'break-word',
	},
	responsiveStyle({
		mobile: { height: '300px' },
		tablet: { height: '400px' },
	}),
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
