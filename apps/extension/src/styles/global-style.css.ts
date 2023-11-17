import { globalStyle } from '@vanilla-extract/css'

import { darkMode } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

globalStyle('html, body', {
	margin: 0,
})

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
	margin: 0,
	padding: 0,
	WebkitFontSmoothing: 'antialiased',
	MozOsxFontSmoothing: 'grayscale',
})

globalStyle('::selection', {
	background: '#8457ff',
	color: '#ffffff',
})

globalStyle('body', {
	textRendering: 'optimizeLegibility',
	fontFamily: vars.fonts.body,
	background: vars.color.backgroundPrimary,
})

globalStyle(`body.${darkMode}`, {
	colorScheme: 'dark',
})
