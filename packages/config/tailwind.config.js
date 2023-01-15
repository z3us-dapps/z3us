const tailWindTokens = require('design/dist/tailwind-tokens')

module.exports = {
	mode: 'jit',
	darkMode: 'class',
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
			...Object.entries(tailWindTokens.fontSize).reduce((acc, [k, v]) => {
				return {
					...acc,
					[k]: [
						v,
						{
							lineHeight: tailWindTokens?.fontLineHeight?.[k],
							letterSpacing: tailWindTokens?.fontLetterSpacing?.[k],
							fontWeight: tailWindTokens?.fontWeight?.[k],
						},
					],
				}
			}, {}),
		},
		colors: {
			...tailWindTokens.color.core,
		},
		fontFamily: {
			...tailWindTokens.fontFamily,
		},
		letterSpacing: {
			...tailWindTokens.letterSpacing,
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
}
