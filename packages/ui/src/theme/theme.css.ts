import firaMonoFontMetrics from '@capsizecss/metrics/firaMono'
import interFontMetrics from '@capsizecss/metrics/inter'
import { precomputeValues } from '@capsizecss/vanilla-extract'
import { createTheme } from '@vanilla-extract/css'

import { darkThemeColors, lightThemeColors, primitiveColors } from './palette'
import type { Breakpoint } from './theme-utils'

const grid = 4
const px = (value: string | number) => `${value}px`

const fontMetrics = {
	brand: {
		...interFontMetrics,
	},
	heading: {
		...interFontMetrics,
	},
	body: {
		...interFontMetrics,
	},
	code: {
		...firaMonoFontMetrics,
	},
}

const calculateTypographyStyles = (
	definition: Record<Breakpoint, { fontSize: number; rows: number }>,
	type: keyof typeof fontMetrics,
) => {
	const mobile = precomputeValues({
		fontSize: definition.mobile.fontSize,
		leading: definition.mobile.rows * grid,
		fontMetrics: fontMetrics[type],
	})

	const tablet = precomputeValues({
		fontSize: definition.tablet.fontSize,
		leading: definition.tablet.rows * grid,
		fontMetrics: fontMetrics[type],
	})

	const desktop = precomputeValues({
		fontSize: definition.desktop.fontSize,
		leading: definition.desktop.rows * grid,
		fontMetrics: fontMetrics[type],
	})

	return {
		mobile: {
			fontSize: mobile.fontSize,
			lineHeight: mobile.lineHeight,
			capHeightTrim: mobile.capHeightTrim,
			baselineTrim: mobile.baselineTrim,
		},
		tablet: {
			fontSize: tablet.fontSize,
			lineHeight: tablet.lineHeight,
			capHeightTrim: tablet.capHeightTrim,
			baselineTrim: tablet.baselineTrim,
		},
		desktop: {
			fontSize: desktop.fontSize,
			lineHeight: desktop.lineHeight,
			capHeightTrim: desktop.capHeightTrim,
			baselineTrim: desktop.baselineTrim,
		},
	}
}

/**
 * Shared theme Values Object
 * This is anything that doesn't change between themes and exists in all themes.
 */
export const sharedThemeValues = {
	fonts: {
		brand: 'var(--font-sans), "Inter", "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		heading: 'var(--font-sans), "Inter", BlinkMacSystemFont, "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		body: 'var(--font-sans), "Inter", BlinkMacSystemFont, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
		code: 'var(--font-mono), "Fira Mono", SFMono-Regular, ui-monospace, "DejaVu Sans Mono", Menlo, Consolas, monospace',
	},
	grid: px(grid),
	spacing: {
		0: '0',
		none: '0',
		half: '50%',
		full: '100%',
		'50vw': '50vw',
		'100vw': '100vw',
		'50vh': '50vh',
		'100vh': '100vh',
		xxsmall: px(0.5 * grid),
		xsmall: px(1 * grid),
		small: px(2 * grid),
		medium: px(3 * grid),
		large: px(5 * grid),
		xlarge: px(8 * grid),
		xxlarge: px(12 * grid),
		xxxlarge: px(24 * grid),
		xxxxlarge: px(32 * grid),
	},
	width: {
		none: '0',
		half: '50%',
		full: '100%',
		'50vw': '50vw',
		'100vw': '100vw',
		'50vh': '50vh',
		'100vh': '100vh',
		xxsmall: px(240),
		xsmall: px(480),
		small: px(600),
		medium: px(740),
		large: px(960),
		xlarge: px(1118),
		xxlarge: px(1220),
		xxxlarge: px(2444),
		xxxxlarge: px(3200),
	},
	text: {
		code: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 11, rows: 3 },
					tablet: { fontSize: 11, rows: 3 },
					desktop: { fontSize: 11, rows: 3 },
				},
				'body',
			),
			spacing: {
				mobile: '0.0em',
				tablet: '0.0em',
				desktop: '0.0em',
			},
		},

		xxsmall: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 12, rows: 4 },
					tablet: { fontSize: 12, rows: 4 },
					desktop: { fontSize: 12, rows: 4 },
				},
				'body',
			),
			spacing: {
				mobile: '0.0em',
				tablet: '0.0em',
				desktop: '0.0em',
			},
		},

		xsmall: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 13, rows: 4 },
					tablet: { fontSize: 13, rows: 4 },
					desktop: { fontSize: 13, rows: 4 },
				},
				'body',
			),
			spacing: {
				mobile: '0.0em',
				tablet: '0.0em',
				desktop: '0.0em',
			},
		},
		small: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 14, rows: 5 },
					tablet: { fontSize: 14, rows: 5 },
					desktop: { fontSize: 14, rows: 5 },
				},
				'body',
			),
			spacing: {
				mobile: '0.0em',
				tablet: '0.0em',
				desktop: '0.0em',
			},
		},
		medium: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 15, rows: 4.5 },
					tablet: { fontSize: 15, rows: 4.5 },
					desktop: { fontSize: 15, rows: 4.5 },
				},
				'body',
			),
			spacing: {
				mobile: '0.0em',
				tablet: '0.0em',
				desktop: '0.0em',
			},
		},
		large: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 16, rows: 6 },
					tablet: { fontSize: 16, rows: 6 },
					desktop: { fontSize: 16, rows: 6 },
				},
				'body',
			),
			spacing: {
				mobile: '0.0em',
				tablet: '0.0em',
				desktop: '0.0em',
			},
		},
		xlarge: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 18, rows: 7 },
					tablet: { fontSize: 18, rows: 7 },
					desktop: { fontSize: 18, rows: 7 },
				},
				'heading',
			),
			spacing: {
				mobile: '0.0em',
				tablet: '0.0em',
				desktop: '0.0em',
			},
		},
		xxlarge: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 24, rows: 9 },
					tablet: { fontSize: 24, rows: 9 },
					desktop: { fontSize: 24, rows: 9 },
				},
				'heading',
			),
			spacing: {
				mobile: '0em',
				tablet: '0em',
				desktop: '0em',
			},
		},
		xxxlarge: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 36, rows: 11 },
					tablet: { fontSize: 36, rows: 11 },
					desktop: { fontSize: 36, rows: 11 },
				},
				'heading',
			),
			spacing: {
				mobile: '-0.02em',
				tablet: '-0.02em',
				desktop: '-0.02em',
			},
		},
		xxxxlarge: {
			calculate: calculateTypographyStyles(
				{
					mobile: { fontSize: 48, rows: 12 },
					tablet: { fontSize: 48, rows: 12 },
					desktop: { fontSize: 48, rows: 12 },
				},
				'heading',
			),
			spacing: {
				mobile: '-0.05em',
				tablet: '-0.05em',
				desktop: '-0.05em',
			},
		},
	},
	weight: {
		regular: '400',
		medium: '500',
		strong: '600',
		stronger: '700',
		extrastrong: '800',
		strongest: '900',
	},
	border: {
		width: {
			xxsmall: px(1),
			xsmall: px(2),
			small: px(1 * grid),
			medium: px(2 * grid),
		},
		radius: {
			xsmall: px(1 * grid),
			small: px(1.5 * grid),
			medium: px(2 * grid),
			large: px(3 * grid),
			xlarge: px(4 * grid),
			xxlarge: px(5 * grid),
			xxxlarge: px(6 * grid),
			full: '9999px',
		},
	},
	transition: {
		none: 'none',
		spin: 'spin 1s linear infinite',
		move: 'move 2s ease-in-out infinite',
		slow: 'transform .3s ease, opacity .3s ease, background .3s ease, color .3s ease, border .3s ease, box-shadow .3s ease',
		slowall: 'all 300ms ease',
		fast: 'transform .15s ease, opacity .15s ease, background .15s ease, color .15s ease, border .15s ease, box-shadow .15s ease',
		fastall: 'all 150ms ease',
	},
	animation: {
		none: 'none',
		spin: 'spin 1s linear infinite',
		move: 'move 2s ease-in-out infinite',
	},
}

/**
 * Variable Semantic color keys
 */
export const lightThemeSpecificColorsKeys = Object.keys(lightThemeColors)

/**
 * Theme Shape for Vanilla Extract's createTheme
 */
export const themeShape = {
	color: {
		...primitiveColors,
		...lightThemeColors,
	},
	...sharedThemeValues,
}

/**
 * Colors Types
 */
export type TThemeColors = (typeof themeShape)['color']
export type TThemeColorKey = keyof TThemeColors

/**
 * Static Light Theme
 */
export const lightTheme = themeShape

/**
 * Static Dark Theme
 */
export const darkTheme = {
	color: {
		...primitiveColors,
		...darkThemeColors,
	},
	...sharedThemeValues,
}

/**
 * Themes
 */
export const themes = {
	lightTheme,
	darkTheme,
}

/**
 * Light Theme
 */
export const [lightThemeClass, vars] = createTheme(themeShape)

/**
 * Dark Theme
 */
export const darkThemeClass = createTheme(vars, darkTheme)
