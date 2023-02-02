import { precomputeValues } from '@capsizecss/vanilla-extract'
import { createTheme } from '@vanilla-extract/css'
import tokens from 'design/dist/tailwind-tokens.json'
import lightTokens from 'design/dist/light/index.json'
import darkTokens from 'design/dist/dark/index.json'

import { Breakpoint } from './theme-utils'

const grid = 4
const px = (value: string | number) => `${value}px`

const fontMetrics = {
	brand: {
		capHeight: 669,
		ascent: 1026,
		descent: -432,
		lineGap: 0,
		unitsPerEm: 1000,
	},
	heading: {
		capHeight: 700,
		ascent: 992,
		descent: -310,
		lineGap: 0,
		unitsPerEm: 1000,
	},
	body: {
		capHeight: 1443,
		ascent: 1950,
		descent: -494,
		lineGap: 0,
		unitsPerEm: 2048,
	},
	code: {
		capHeight: 700,
		ascent: 1060,
		descent: -320,
		lineGap: 0,
		unitsPerEm: 1000,
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
		brand: '"Inter", "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		heading: '"Inter", BlinkMacSystemFont, "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		body: '"Inter", BlinkMacSystemFont, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
		code: 'ml, "Roboto Mono", Menlo, monospace',
	},
	grid: px(grid),
	spacing: {
		none: '0',
		xsmall: px(1 * grid),
		small: px(2 * grid),
		medium: px(3 * grid),
		large: px(5 * grid),
		xlarge: px(8 * grid),
		xxlarge: px(12 * grid),
		xxxlarge: px(24 * grid),
	},
	contentWidth: {
		xsmall: px(480),
		small: px(600),
		medium: px(740),
		large: px(960),
		xlarge: px(1120),
		xxlarge: px(1350),
	},
	text: {
		code: calculateTypographyStyles(
			{
				mobile: { fontSize: 11, rows: 6 },
				tablet: { fontSize: 12, rows: 7 },
				desktop: { fontSize: 12, rows: 7 },
			},
			'body',
		),
		xsmall: calculateTypographyStyles(
			{
				mobile: { fontSize: 12, rows: 5 },
				tablet: { fontSize: 12, rows: 5 },
				desktop: { fontSize: 12, rows: 5 },
			},
			'body',
		),
		medium: calculateTypographyStyles(
			{
				mobile: { fontSize: 15, rows: 8 },
				tablet: { fontSize: 15, rows: 8 },
				desktop: { fontSize: 15, rows: 8 },
			},
			'body',
		),
		small: calculateTypographyStyles(
			{
				mobile: { fontSize: 13, rows: 6 },
				tablet: { fontSize: 13, rows: 6 },
				desktop: { fontSize: 13, rows: 6 },
			},
			'body',
		),
		large: calculateTypographyStyles(
			{
				mobile: { fontSize: 16, rows: 9 },
				tablet: { fontSize: 16, rows: 10 },
				desktop: { fontSize: 18, rows: 10 },
			},
			'body',
		),
		xlarge: calculateTypographyStyles(
			{
				mobile: { fontSize: 20, rows: 9 },
				tablet: { fontSize: 24, rows: 10 },
				desktop: { fontSize: 24, rows: 10 },
			},
			'body',
		),
		xxlarge: calculateTypographyStyles(
			{
				mobile: { fontSize: 24, rows: 12 },
				tablet: { fontSize: 30, rows: 10 },
				desktop: { fontSize: 30, rows: 10 },
			},
			'body',
		),
		xxxlarge: calculateTypographyStyles(
			{
				mobile: { fontSize: 30, rows: 12 },
				tablet: { fontSize: 36, rows: 10 },
				desktop: { fontSize: 36, rows: 10 },
			},
			'body',
		),
	},
	weight: {
		lighter: '100',
		regular: '400',
		medium: '500',
		strong: '700',
		stronger: '900',
	},
	border: {
		width: {
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
}

/**
 * Primitive Color values
 * These are the palette that all themes pull from
 */
export const primitiveColors = {
	transparent: 'transparent',
	white: '#fff',
	black: '#0e0e10',

	bleached_silk0: tokens.color.core.bleached_silk['0'],
	bleached_silk100: tokens.color.core.bleached_silk['100'],
	bleached_silk200: tokens.color.core.bleached_silk['200'],
	bleached_silk300: tokens.color.core.bleached_silk['300'],
	bleached_silk400: tokens.color.core.bleached_silk['400'],
	bleached_silk500: tokens.color.core.bleached_silk['500'],
	bleached_silk600: tokens.color.core.bleached_silk['600'],
	bleached_silk700: tokens.color.core.bleached_silk['700'],
	bleached_silk800: tokens.color.core.bleached_silk['800'],
	bleached_silk900: tokens.color.core.bleached_silk['900'],
	bleached_silk1000: tokens.color.core.bleached_silk['1000'],

	wax0: tokens.color.core.wax['0'],
	wax100: tokens.color.core.wax['100'],
	wax200: tokens.color.core.wax['200'],
	wax300: tokens.color.core.wax['300'],
	wax400: tokens.color.core.wax['400'],
	wax500: tokens.color.core.wax['500'],
	wax600: tokens.color.core.wax['600'],
	wax700: tokens.color.core.wax['700'],
	wax800: tokens.color.core.wax['800'],
	wax900: tokens.color.core.wax['900'],
	wax1000: tokens.color.core.wax['1000'],

	lead0: tokens.color.core.lead['0'],
	lead100: tokens.color.core.lead['100'],
	lead200: tokens.color.core.lead['200'],
	lead300: tokens.color.core.lead['300'],
	lead400: tokens.color.core.lead['400'],
	lead500: tokens.color.core.lead['500'],
	lead600: tokens.color.core.lead['600'],
	lead700: tokens.color.core.lead['700'],
	lead800: tokens.color.core.lead['800'],
	lead900: tokens.color.core.lead['900'],
	lead1000: tokens.color.core.lead['1000'],

	purple0: tokens.color.core.purple['0'],
	purple100: tokens.color.core.purple['100'],
	purple200: tokens.color.core.purple['200'],
	purple300: tokens.color.core.purple['300'],
	purple400: tokens.color.core.purple['400'],
	purple500: tokens.color.core.purple['500'],
	purple600: tokens.color.core.purple['600'],
	purple700: tokens.color.core.purple['700'],
	purple800: tokens.color.core.purple['800'],
	purple900: tokens.color.core.purple['900'],
	purple1000: tokens.color.core.purple['1000'],

	red0: tokens.color.core.red['0'],
	red100: tokens.color.core.red['100'],
	red200: tokens.color.core.red['200'],
	red300: tokens.color.core.red['300'],
	red400: tokens.color.core.red['400'],
	red500: tokens.color.core.red['500'],
	red600: tokens.color.core.red['600'],
	red700: tokens.color.core.red['700'],
	red800: tokens.color.core.red['800'],
	red900: tokens.color.core.red['900'],
	red1000: tokens.color.core.red['1000'],
}

/**
 * Light Theme Variable Semantic (Core) colors
 */
export const lightThemeColors = {
	colorNeutral: lightTokens.color.font.neutral.value,
	colorStrong: lightTokens.color.font.strong.value,
	backgroundPrimary: lightTokens.color.background.primary.value,
	backgroundSecondary: lightTokens.color.background.secondary.value,
	shadowMedium: lightTokens.color.shadow.medium.value,

	btnSecondaryBackground: lightTokens.color.background.btn_secondary_background.value,
	btnSecondaryBackgroundHover: lightTokens.color.background.btn_secondary_background_hover.value,
	btnSecondaryBorderColor: lightTokens.color.border.btn_secondary_border.value,
	btnSecondaryBorderColorHover: lightTokens.color.border.btn_secondary_border_hover.value,

	btnGhostBorderColor: lightTokens.color.border.btn_ghost_border.value,
	btnGhostBorderColorHover: lightTokens.color.border.btn_ghost_border_hover.value,
}

/**
 * Dark Theme Variable Semantic (Core) colors
 */
export const darkThemeColors = {
	colorNeutral: darkTokens.color.font.neutral.value,
	colorStrong: darkTokens.color.font.strong.value,
	backgroundPrimary: darkTokens.color.background.primary.value,
	backgroundSecondary: darkTokens.color.background.secondary.value,
	shadowMedium: darkTokens.color.shadow.medium.value,
	btnSecondaryBackground: darkTokens.color.background.btn_secondary_background.value,
	btnSecondaryBackgroundHover: darkTokens.color.background.btn_secondary_background_hover.value,
	btnSecondaryBorderColor: darkTokens.color.border.btn_secondary_border.value,
	btnSecondaryBorderColorHover: darkTokens.color.border.btn_secondary_border_hover.value,
	btnGhostBorderColor: darkTokens.color.border.btn_ghost_border.value,
	btnGhostBorderColorHover: darkTokens.color.border.btn_ghost_border_hover.value,
}

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
 * Static Light Theme
 * Do not use inline for styles
 */
export const lightTheme = themeShape

/**
 * Static Dark Theme
 * Do not use inline for styles
 */
export const darkTheme = {
	color: {
		...primitiveColors,
		...darkThemeColors,
	},
	...sharedThemeValues,
}

/**
 * List of ALL themes
 */
export const themes = {
	lightTheme,
	darkTheme,
}

/**
 * Light Theme tools
 */
export const [lightThemeClass, vars] = createTheme(themeShape)

/**
 * Dark Theme tools
 * note: validated by light theme's vars so we make sure it has the same shape
 */
export const darkThemeClass = createTheme(vars, darkTheme)
