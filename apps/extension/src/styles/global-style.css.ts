import { globalStyle } from '@vanilla-extract/css'

import { darkMode } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

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
	fontFamily: vars.fonts.body,
	background: vars.color.backgroundPrimary,
	textRendering: 'optimizeLegibility',
	WebkitFontSmoothing: 'antialiased',
	WebkitTextSizeAdjust: '100%',
	MozOsxFontSmoothing: 'grayscale',
	fontSynthesis: 'none',
	fontSmooth: 'always',
})

globalStyle(`body.${darkMode}`, {
	colorScheme: 'dark',
})
