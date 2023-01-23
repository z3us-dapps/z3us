import { globalStyle } from '@vanilla-extract/css'
import { darkMode } from './sprinkles.css'
import { vars } from './theme.css'
import './reset.css'

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
	margin: 0,
	padding: 0,
})

globalStyle('body', {
	background: vars.palette.stone100,
})

globalStyle(`.${darkMode} body`, {
	background: vars.palette.stone900,
	color: vars.palette.gray50,
	colorScheme: 'dark',
})
