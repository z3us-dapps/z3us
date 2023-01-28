import { precomputeValues } from '@capsizecss/vanilla-extract'
import { createTheme } from '@vanilla-extract/css'
import tokens from 'design/dist/tailwind-tokens.json'
import lightTokens from 'design/dist/light/index.json'
import darkTokens from 'design/dist/dark/index.json'

import { Breakpoint } from './theme-utils'

// console.log('dark background:', darkTokens.color.background.primary.value)
// console.log('light background:', lightTokens.color.background.primary.value)

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
		brand: 'source-han-sans-japanese, "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		heading: 'source-han-sans-japanese, BlinkMacSystemFont, "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		body: '"Inter", BlinkMacSystemFont, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
		code: 'ml, "Roboto Mono", Menlo, monospace',
		HaasGrotTextRound: "'HaasGrotTextRound-Web', Arial",
		HaasGrotDisplayRound: "'HaasGrotDispRound-Web', Arial",
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
		standard: px(740),
		large: px(960),
		xlarge: px(1120),
		xxlarge: px(1350),
	},
	heading: {
		h1: calculateTypographyStyles(
			{
				mobile: {
					fontSize: 24,
					rows: 12,
				},
				tablet: {
					fontSize: 32,
					rows: 15,
				},
				desktop: {
					fontSize: 32,
					rows: 15,
				},
			},
			'heading',
		),
		h2: calculateTypographyStyles(
			{
				mobile: {
					fontSize: 22,
					rows: 10,
				},
				tablet: {
					fontSize: 24,
					rows: 12,
				},
				desktop: {
					fontSize: 24,
					rows: 12,
				},
			},
			'heading',
		),
		h3: calculateTypographyStyles(
			{
				mobile: {
					fontSize: 20,
					rows: 8,
				},
				tablet: {
					fontSize: 20,
					rows: 10,
				},
				desktop: {
					fontSize: 20,
					rows: 10,
				},
			},
			'heading',
		),
		h4: calculateTypographyStyles(
			{
				mobile: {
					fontSize: 20,
					rows: 8,
				},
				tablet: {
					fontSize: 20,
					rows: 9,
				},
				desktop: {
					fontSize: 20,
					rows: 9,
				},
			},
			'heading',
		),
	},
	text: {
		standard: calculateTypographyStyles(
			{
				mobile: {
					fontSize: 16,
					rows: 9,
				},
				tablet: {
					fontSize: 16,
					rows: 10,
				},
				desktop: {
					fontSize: 18,
					rows: 10,
				},
			},
			'body',
		),
		code: calculateTypographyStyles(
			{
				mobile: {
					fontSize: 11,
					rows: 6,
				},
				tablet: {
					fontSize: 12,
					rows: 7,
				},
				desktop: {
					fontSize: 12,
					rows: 7,
				},
			},
			'body',
		),
		small: calculateTypographyStyles(
			{
				mobile: {
					fontSize: 16,
					rows: 8,
				},
				tablet: {
					fontSize: 16,
					rows: 8,
				},
				desktop: {
					fontSize: 16,
					rows: 8,
				},
			},
			'body',
		),
		xsmall: calculateTypographyStyles(
			{
				mobile: {
					fontSize: 15,
					rows: 7,
				},
				tablet: {
					fontSize: 15,
					rows: 7,
				},
				desktop: {
					fontSize: 15,
					rows: 7,
				},
			},
			'body',
		),
	},
	weight: {
		lighter: '100',
		regular: '400',
		strong: '700',
		stronger: '900',
	},
	border: {
		width: {
			standard: px(1 * grid),
			large: px(2 * grid),
		},
		radius: {
			small: px(2 * grid),
			medium: px(4 * grid),
			large: px(7 * grid),
			full: '9999px',
		},
	},
}

/**
 * Primitive Color values
 * These are the palette that all themes pull from
 */
export const primitiveColors = {
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

	pheasants_egg0: tokens.color.core.pheasants_egg['0'],
	pheasants_egg100: tokens.color.core.pheasants_egg['100'],
	pheasants_egg200: tokens.color.core.pheasants_egg['200'],
	pheasants_egg300: tokens.color.core.pheasants_egg['300'],
	pheasants_egg400: tokens.color.core.pheasants_egg['400'],
	pheasants_egg500: tokens.color.core.pheasants_egg['500'],
	pheasants_egg600: tokens.color.core.pheasants_egg['600'],
	pheasants_egg700: tokens.color.core.pheasants_egg['700'],
	pheasants_egg800: tokens.color.core.pheasants_egg['800'],
	pheasants_egg900: tokens.color.core.pheasants_egg['900'],
	pheasants_egg1000: tokens.color.core.pheasants_egg['1000'],

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
}

/**
 * Light Theme Variable Semantic (Core) colors
 */
export const lightThemeColors = {
	defaultColor: lightTokens.color.font.primary.value,
	backgroundPrimary: lightTokens.color.background.primary.value,
}

/**
 * Dark Theme Variable Semantic (Core) colors
 */
export const darkThemeColors = {
	defaultColor: darkTokens.color.font.primary.value,
	backgroundPrimary: darkTokens.color.background.primary.value,
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
