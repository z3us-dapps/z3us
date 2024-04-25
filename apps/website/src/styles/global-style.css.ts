import { globalStyle } from '@vanilla-extract/css'

import { darkMode } from 'ui/src/theme/sprinkles.css'
import { vars } from 'ui/src/theme/theme.css'

globalStyle('html', {
	overflowX: 'hidden',
})

globalStyle('html, body', {
	margin: 0,
})

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
	margin: 0,
	padding: 0,
})

globalStyle('::selection', {
	background: vars.color.purple500,
	color: vars.color.white,
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
