import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/theme/sprinkles.css'
import { responsiveStyle } from 'ui/src/theme/theme-utils'
import { vars } from 'ui/src/theme/theme.css'

export const scrollOuterWrapper = style([
	sprinkles({
		width: 'full',
		position: 'relative',
	}),
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
])

export const scrollWrapper = style([
	sprinkles({
		border: 1,
		borderStyle: 'solid',
		borderRadius: 'small',
		borderColor: 'borderDivider',
		background: 'backgroundSecondary',

		width: 'full',
		height: 'full',
	}),
])

export const scrollViewPortWrapper = style([
	sprinkles({
		padding: 'medium',
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
	}),
	{
		selectors: {
			'&:focus-visible': {
				outline: 'none',
			},
		},
	},
])

export const textWrapper = style([
	sprinkles({}),
	{
		fontFamily: vars.fonts.code,
		wordWrap: 'break-word',
	},
])

export const textWrapperWhiteSpacePre = style([{ whiteSpace: 'pre' }])

export const copyButton = style([
	sprinkles({
		position: 'absolute',
		transition: 'fast',
		opacity: 0,
		pointerEvents: 'none',
	}),
	{
		top: '8px',
		right: '12px',
	},
])

globalStyle(`${scrollWrapper}:hover ${copyButton}`, {
	opacity: 1,
	pointerEvents: 'all',
})
