import { globalStyle } from '@vanilla-extract/css'

import { darkMode } from './sprinkles.css'
import { vars } from './theme.css'

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
	margin: 0,
	padding: 0,
})

globalStyle('::selection', {
	background: vars.color.purple500,
	color: vars.color.white,
})

globalStyle('html, body', {
	margin: 0,
})

globalStyle('body', {
	textRendering: 'optimizeLegibility',
	fontFamily: vars.fonts.body,
})

globalStyle(`body.${darkMode}`, {
	colorScheme: 'dark',
})
