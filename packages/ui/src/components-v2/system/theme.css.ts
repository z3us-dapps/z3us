import { precomputeValues } from '@capsizecss/vanilla-extract'
import { createGlobalTheme } from '@vanilla-extract/css'
import twcolors from 'tailwindcss/colors'
import tokens from 'design/dist/tailwind-tokens.json'

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

const tailwindPalette = {
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

	red: twcolors.red['500'],
	yellow: twcolors.yellow['300'],
	green50: twcolors.emerald['50'],
	green200: twcolors.emerald['200'],
	green300: twcolors.emerald['300'],
	green400: twcolors.emerald['400'],
	green500: twcolors.emerald['500'],
	green600: twcolors.emerald['600'],

	slate50: twcolors.slate['50'],
	slate100: twcolors.slate['100'],
	slate200: twcolors.slate['200'],
	slate300: twcolors.slate['300'],
	slate400: twcolors.slate['400'],
	slate500: twcolors.slate['500'],
	slate600: twcolors.slate['600'],
	slate700: twcolors.slate['700'],
	slate800: twcolors.slate['800'],
	slate900: twcolors.slate['900'],

	gray50: twcolors.gray['50'],
	gray100: twcolors.gray['100'],
	gray200: twcolors.gray['200'],
	gray300: twcolors.gray['300'],
	gray400: twcolors.gray['400'],
	gray500: twcolors.gray['500'],
	gray600: twcolors.gray['600'],
	gray700: twcolors.gray['700'],
	gray800: twcolors.gray['800'],
	gray900: twcolors.gray['900'],

	stone50: twcolors.stone['50'],
	stone100: twcolors.stone['100'],
	stone200: twcolors.stone['200'],
	stone300: twcolors.stone['300'],
	stone400: twcolors.stone['400'],
	stone500: twcolors.stone['500'],
	stone600: twcolors.stone['600'],
	stone700: twcolors.stone['700'],
	stone800: twcolors.stone['800'],
	stone900: twcolors.stone['900'],

	blueGray800: twcolors.slate['800'],
	blueGray900: twcolors.slate['900'],

	teal50: twcolors.teal['50'],
	teal100: twcolors.teal['100'],
	teal200: twcolors.teal['200'],
	teal300: twcolors.teal['300'],
	teal400: twcolors.teal['400'],
	teal500: twcolors.teal['500'],
	teal600: twcolors.teal['600'],
	teal700: twcolors.teal['700'],
	teal800: twcolors.teal['800'],
	teal900: twcolors.teal['900'],

	blue50: twcolors.sky['50'],
	blue100: twcolors.sky['100'],
	blue200: twcolors.sky['200'],
	blue300: twcolors.sky['300'],
	blue400: twcolors.sky['400'],
	blue500: twcolors.sky['500'],
	blue600: twcolors.sky['600'],
	blue700: twcolors.sky['700'],
	blue800: twcolors.sky['800'],
	blue900: twcolors.sky['900'],

	pink50: twcolors.fuchsia['50'],
	pink100: twcolors.fuchsia['100'],
	pink200: twcolors.fuchsia['200'],
	pink300: twcolors.fuchsia['300'],
	pink400: twcolors.fuchsia['400'],
	pink500: twcolors.fuchsia['500'],
	pink600: twcolors.fuchsia['600'],
	pink700: twcolors.fuchsia['700'],
	pink800: twcolors.fuchsia['800'],
	pink900: twcolors.fuchsia['900'],
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

export const vars = createGlobalTheme(':root', {
	fonts: {
		brand: 'source-han-sans-japanese, "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		heading: 'source-han-sans-japanese, BlinkMacSystemFont, "Helvetica Neue", HelveticaNeue, Helvetica, sans-serif',
		body: 'source-han-sans-japanese, BlinkMacSystemFont, "Helvetica Neue", HelveticaNeue, Helvetica, Arial, sans-serif',
		code: 'ml, "Roboto Mono", Menlo, monospace',
		HaasGrotTextRound: "'HaasGrotTextRound-Web', Arial",
		HaasGrotDisplayRound: "'HaasGrotDispRound-Web', Arial",
		Inter: "'Inter', sans-serif",
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
	palette: tailwindPalette,
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
})
