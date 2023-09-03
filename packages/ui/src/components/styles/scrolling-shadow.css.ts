import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'

import { vars } from '../system/theme.css'

const LIGHT_SHADOW = '0px 13px 13px -14px rgba(0, 0, 0, 0.4)'
const DARK_SHADOW = '0px 13px 13px -14px rgba(0, 0, 0, 0.4)'

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
