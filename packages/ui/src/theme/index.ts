import type * as Stitches from '@stitches/react'
import { createStitches } from '@stitches/react'
import { lightColors, lightShadows } from './light-colors'
import { darkColors, darkShadows } from './dark-colors'
import { utils } from './utils'

export const { config, createTheme, css, getCssText, globalCss, styled, theme, keyframes } = createStitches({
	utils,
	media: {
		xs: '(min-width: 420px)',
		sm: '(min-width: 650px)',
		md: '(min-width: 960px)',
		lg: '(min-width: 1280px)',
		xl: '(min-width: 1400px)',
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
		},
		fontSizes: {
			1: '11px',
			2: '12px',
			3: '13px',
			4: '14px',
			5: '15px',
			6: '17px',
			7: '21px',
			8: '24px',
			9: '28px',
			10: '36px',
			11: '44px',
			12: '52px',
			13: '60px',
			14: '68px',
			15: '76px',
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
		fontWeight: 500,
		fontVariantNumeric: 'tabular-nums',
		fontFamily: '$HaasGrotTextRound',
		fontSize: '$1',
		textRendering: 'optimizeLegibility',
		'font-smoothing': 'antialiased',
		'-webkit-font-smoothing': 'antialiased',
		color: '$txtDefault',
		fill: '$txtDefault',
		ul: {
			margin: '0',
			padding: '0',
			listStyleType: 'none',
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
