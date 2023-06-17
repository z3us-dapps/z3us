import { globalStyle } from '@vanilla-extract/css'

globalStyle('html, body', {
	height: '100%',
	margin: 0,
})

globalStyle('*, *::before, *::after', {
	boxSizing: 'border-box',
	margin: 0,
	padding: 0,
	WebkitFontSmoothing: 'antialiased',
	MozOsxFontSmoothing: 'grayscale',
})

globalStyle('body', {
	margin: '0',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
})

globalStyle('::selection', {
	background: '#BF40BF',
	color: '#fff',
	// background: vars.color.purple500,
	// color: vars.color.white,
})

globalStyle('h1, h2, h3, h4, p', {
	margin: 0,
})

// globalStyle('body', {
// 	textRendering: 'optimizeLegibility',
// 	fontFamily: vars.fonts.body,
// })

// globalStyle(`body.${darkMode}`, {
// 	colorScheme: 'dark',
// })
