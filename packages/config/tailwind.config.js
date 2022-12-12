const tailWindTokens = require('design/dist/theme-one/tailwind-tokens')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	mode: 'jit',
	content: [
		'../../apps/website/components/**/*.{js,ts,jsx,tsx}',
		'../../apps/website/pages/**/*.{js,ts,jsx,tsx}',
		'../../apps/website/styles/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		screens: {
			...tailWindTokens.screens,
		},
		spacing: {
			...tailWindTokens.spacing,
		},
		fontSize: {
			...tailWindTokens.fontSize,
		},
		colors: {
			...tailWindTokens.colors,
		},
		fontFamily: {
			...tailWindTokens.fontFamily,
		},
		extend: {
			keyframes: {},
			animation: {},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	darkMode: 'class',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
}
