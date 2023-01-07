const StyleDictionaryPackage = require('style-dictionary')
const { fileHeader } = StyleDictionaryPackage.formatHelpers

const options = {
	showFileHeader: false,
}

const PLATFORM_WEB_CSS = 'web/css'
const PLATFORM_WEB_TAILWIND = 'web/tailwind'
const THEME_LIGHT = 'light'
const THEME_DARK = 'dark'

StyleDictionaryPackage.registerFormat({
	name: 'css/variables-themed',
	formatter: function ({ dictionary, file, options }) {
		const { theme } = options

		return (
			fileHeader({ file }) +
			`.${theme} {\n` +
			dictionary.allProperties
				.map(prop => `--${prop.name}: ${theme === 'dark' ? prop.darkValue : prop.value};`)
				.join('\n') +
			'\n}\n'
		)
	},
})

const getStyleDictionaryConfig = () => {
	return {
		source: ['tokens/foundation/**/*.json'],
		platforms: {
			[PLATFORM_WEB_CSS]: {
				transformGroup: 'css',
				buildPath: `./dist/`,
				options,
				files: [
					{
						destination: 'index.css',
						format: 'css/variables',
					},
				],
			},
			[PLATFORM_WEB_TAILWIND]: {
				transformGroup: 'js',
				buildPath: `./dist/`,
				options,
				files: [
					{
						destination: 'tailwind-tokens.json',
						format: 'json/nested',
					},
				],
			},
			'web/js': {
				transforms: ['name/cti/constant'],
				buildPath: `./dist/`,
				options,
				files: [
					{
						destination: 'index.js',
						format: 'javascript/module',
					},
				],
			},
		},
	}
}

const getStyleDictionaryThemeConfig = ({ theme }) => {
	return {
		source: ['tokens/foundation/**/*.json', `tokens/theme/**/*.json`],
		platforms: {
			[PLATFORM_WEB_CSS]: {
				transformGroup: 'css',
				buildPath: `./dist/${theme}/`,
				options,
				files: [
					{
						destination: 'index.css',
						format: 'css/variables-themed',
						filter: token => {
							return !token.filePath.includes('tokens/foundation') && token.attributes.category === `color`
						},
						options: {
							outputReferences: false,
							theme,
						},
					},
				],
			},
		},
	}
}

console.log(`\n\n Building tokens ...`)

const platforms = [PLATFORM_WEB_CSS, PLATFORM_WEB_TAILWIND]
const themes = [THEME_LIGHT, THEME_DARK]

platforms.forEach(platform => {
	const config = getStyleDictionaryConfig({ platform })
	const StyleDictionary = StyleDictionaryPackage.extend(config)
	StyleDictionary.buildPlatform(platform)
})

console.log(`\n\n🌙☀️  Building token themes ...`)

themes.forEach(theme => {
	const config = getStyleDictionaryThemeConfig({ theme })
	const StyleDictionary = StyleDictionaryPackage.extend(config)
	StyleDictionary.buildPlatform(PLATFORM_WEB_CSS)
})

console.log('Build finished...')
