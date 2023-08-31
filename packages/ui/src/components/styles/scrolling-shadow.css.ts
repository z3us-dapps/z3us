import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'

import { vars } from '../system/theme.css'

const LIGHT_SHADOW = '0px 13px 13px -14px rgba(0, 0, 0, 0.4)'
const DARK_SHADOW = '0px 13px 13px -14px rgba(0, 0, 0, 0.4)'

export const accountHeadShadow = style([
	sprinkles({
		position: 'sticky',
		height: 'xlarge',
		transition: 'fast',
		pointerEvents: 'none',
	}),
	{
		height: '0px',
		'::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			height: '24px',
			transform: 'translateY(-24px)',
			pointerEvents: 'none',
			background: 'blue',
			opacity: 0,
			transition: vars.transition.fast,
			boxShadow: '0px 10px 11px -7px rgba(0, 0, 0, 0.4)',
		},
	},
])

export const accountHeadShadowScrolled = style([
	sprinkles({}),
	{
		'::after': {
			opacity: 1,
		},
	},
])

export const accountTheadShadow = style([
	sprinkles({
		position: 'relative',
	}),
])

globalStyle(`${accountTheadShadow} thead tr th:first-child::before`, {
	boxShadow: LIGHT_SHADOW,
})

globalStyle(`.${darkMode} ${accountTheadShadow} thead tr th:first-child::before`, {
	boxShadow: DARK_SHADOW,
})
