import type * as Stitches from '@stitches/react'
import { createStitches } from '@stitches/react'
import { lightColors, lightShadows } from './light-colors'
import { darkColors, darkShadows } from './dark-colors'
import { utils } from './utils'

export const mediaSizes = {
	sx: 420,
	sm: 650,
	md: 960,
	lg: 1280,
	xl: 1400,
}

export const { config, createTheme, css, getCssText, globalCss, styled, theme, keyframes } = createStitches({
	utils,
	media: {
		xs: `(min-width: ${mediaSizes.sx}px)`,
		sm: `(min-width: ${mediaSizes.sm}px)`,
		md: `(min-width: ${mediaSizes.md}px)`,
		lg: `(min-width: ${mediaSizes.lg}px)`,
		xl: `(min-width: ${mediaSizes.xl}px)`,
		motion: '(prefers-reduced-motion)',
		hover: '(any-hover: hover)',
		dark: '(prefers-color-scheme: dark)',
		light: '(prefers-color-scheme: light)',
	},
	theme: {
		fonts: {
			untitled: 'Untitled Sans, -apple-system, system-ui, sans-serif',
			mono: 'Söhne Mono, monospace',
			montserrat: '"Montserrat", sans-serif',
			fira: '"Fira Sans", sans-serif',
			Centra: "'Centra-Web', Arial",
			HaasGrotTextRound: "'HaasGrotTextRound-Web', Arial",
			HaasGrotDisplayRound: "'HaasGrotDispRound-Web', Arial",
			Inter: "'Inter', sans-serif",
		},
		fontSizes: {
			1: '11px',
			2: '12px',
			3: '13px',
			4: '14px',
			5: '16px',
			6: '18px',
			7: '20px',
			8: '24px',
			9: '28px',
			10: '32px',
			11: '36px',
			12: '40px',
			13: '48px',
			14: '56px',
			15: '68px',
		},
		lineHeights: {
			1: '13px',
			2: '14px',
			3: '15px',
			4: '16px',
			5: '18px',
			6: '20px',
			7: '23px',
			8: '26px',
			9: '30px',
			10: '38px',
			11: '48px',
			12: '50px',
			13: '58px',
			14: '66px',
			15: '74px',
		},
		space: {
			1: '4px',
			2: '8px',
			3: '12px',
			4: '16px',
			5: '20px',
			6: '24px',
			7: '28px',
			8: '32px',
			9: '36px',
			10: '40px',
			11: '44px',
			12: '48px',
		},
		sizes: {
			1: '4px',
			2: '8px',
			3: '12px',
			4: '16px',
			5: '20px',
			6: '24px',
			7: '28px',
			8: '32px',
			9: '36px',
			10: '40px',
			11: '44px',
			12: '48px',
		},
		radii: {
			1: '4px',
			2: '6px',
			3: '8px',
			4: '12px',
			round: '50%',
			pill: '9999px',
		},
		zIndices: {
			1: '100',
			2: '200',
			3: '300',
			4: '400',
			max: '999',
		},
		transitions: {
			default: 'all 250ms ease',
		},
		shadows: lightShadows,
		colors: lightColors,
	},
})

export const darkTheme = createTheme('dark-theme', {
	shadows: darkShadows,
	colors: darkColors,
})

export type { VariantProps } from '@stitches/react'
export type CSS = Stitches.CSS<typeof config>

export const globalStyles = globalCss({
	body: {
		margin: '0',
		padding: '0',
		fontWeight: 400,
		fontVariantNumeric: 'tabular-nums',
		fontFamily: '$Inter',
		fontSize: '$1',
		textRendering: 'optimizeLegibility',
		'-moz-osx-font-smoothing': 'grayscale',
		// Best for non-retina
		'-webkit-font-smoothing': 'subpixel-antialiased',
		color: '$txtDefault',
		fill: '$txtDefault',
		ul: {
			margin: '0',
			padding: '0',
			listStyleType: 'none',
		},
		'@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)': {
			body: {
				// Best for retina
				'font-smoothing': 'antialiased',
				'-webkit-font-smoothing': 'antialiased',
			},
		},
	},
})

export const sharedFocus = css({
	WebkitTapHighlightColor: 'transparent',
	'&:focus:not(&:focus-visible)': {
		boxShadow: 'none',
	},
	'&:focus': {
		outline: 'none',
		boxShadow: '$buttonFocusShadow',
	},
	'@safari': {
		WebkitTapHighlightColor: 'transparent',
		outline: 'none',
	},
})

export const sharedItemStyles = css({
	all: 'unset',
	position: 'relative',
	fontSize: 12,
	fontWeight: 700,
	color: '$txtDefault',
	zIndex: 1,
	lineHeight: 1,
	borderRadius: 3,
	display: 'flex',
	alignItems: 'center',
	height: 25,
	padding: '0 5px',
	paddingLeft: 10,
	userSelect: 'none',
	transition: '$default',
	'&[data-disabled]': {
		color: '$txtDisabled',
		pointerEvents: 'none',
		backgroundColor: 'transparent',
	},
	'&:hover': {
		backgroundColor: '$bgPanelHover',
		color: '$txtActive',
	},
	'&:focus': {
		backgroundColor: '$bgPanelHover',
		color: '$txtActive',
	},
})

export const sharedItemIndicatorStyles = css({
	position: 'absolute',
	right: 0,
	top: '1px',
	width: 25,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',

	'&:after': {
		content: '',
		position: 'absolute',
		width: '5px',
		height: '5px',
		top: '10px',
		right: '6px',
		br: '100%',
		bg: '$txtDefault',
		boxSizing: 'border-box',
		pe: 'none',
	},
})
