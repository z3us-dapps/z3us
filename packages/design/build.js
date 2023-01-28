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

const removeTokenSiblings = (obj, theme) => {
	const isDarkTheme = theme === 'dark'
	const k = isDarkTheme ? 'darkValue' : 'value'
	for (const key in obj) {
		if (key === k) {
			if (isDarkTheme) {
				obj['value'] = obj['darkValue']
				delete obj['darkValue']
				const parent = Object.keys(obj).filter(k => k !== 'value')
				parent.forEach(k => delete obj[k])
				return obj
			} else {
				const parent = Object.keys(obj).filter(k => k !== key)
				parent.forEach(k => delete obj[k])
				return obj
			}
		}
		if (typeof obj[key] === 'object') {
			removeTokenSiblings(obj[key], theme)
		}
	}
	return obj
}

StyleDictionaryPackage.registerFormat({
	name: 'json/variables-themed',
	formatter: function ({ dictionary, options }) {
		const { theme } = options
		const tokens = Object.assign({}, dictionary.tokens)
		const formatTokens = removeTokenSiblings(tokens, theme)

		return JSON.stringify(formatTokens, null, 2)
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
							outputReferences: true,
							theme,
						},
					},
				],
			},
			[PLATFORM_WEB_TAILWIND]: {
				transformGroup: 'js',
				buildPath: `./dist/${theme}/`,
				options,
				files: [
					{
						destination: 'index.json',
						format: 'json/variables-themed',
						filter: token => {
							return !token.filePath.includes('tokens/foundation') && token.attributes.category === `color`
						},
						options: {
							outputReferences: true,
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
	StyleDictionary.buildPlatform(PLATFORM_WEB_TAILWIND)
})

console.log('Build finished...')
