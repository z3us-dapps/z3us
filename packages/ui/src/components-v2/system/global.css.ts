import { globalStyle } from '@vanilla-extract/css'
import { darkMode } from './sprinkles.css'
import { vars } from './theme.css'

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
	margin: 0,
	padding: 0,
})

globalStyle('html, body', {
	margin: 0,
})

globalStyle('body', {
	background: vars.palette.stone100,
	color: vars.palette.white,
	textRendering: 'optimizeLegibility',
})

globalStyle(`body.${darkMode}`, {
	background: vars.palette.stone900,
	color: vars.palette.red,
	colorScheme: 'dark',
})
