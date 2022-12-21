module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-custom-media': {
			importFrom: '../../packages/design/tokens/media.css',
		},
		'tailwindcss/nesting': {},
		tailwindcss: {},
		autoprefixer: {},
	},
}
