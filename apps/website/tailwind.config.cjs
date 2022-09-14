/** @type {import('tailwindcss').Config} */
// const tailwindcssRadix = require('tailwindcss-radix')

/*
apps/web/tailwind.config.js
apps/docs/tailwind.config.js
packages/ui/tailwind.config.js
*/
// @TODO: setup with turbo repo
// module.exports = require('config/tailwind.config')
module.exports = {
	content: [
		// '../../packages/ui/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
}
