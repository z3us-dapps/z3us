const StyleDictionaryPackage = require('style-dictionary')
const { fileHeader, formattedVariables } = StyleDictionaryPackage.formatHelpers

const options = {
  showFileHeader: false,
}

StyleDictionaryPackage.registerFormat({
  name: 'css/variables-themed',
  formatter: function({ dictionary, file, options }) {
    const { outputReferences, theme } = options
    return (
      fileHeader({ file }) +
      `.${theme} {\n` +
      formattedVariables({ format: 'css', dictionary, outputReferences }) +
      '\n}\n'
    )
  },
})

const getStyleDictionaryConfig = () => {
  return {
    source: ['tokens/foundation/**/*.json'],
    platforms: {
      'web/css': {
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
      'web/tailwind': {
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
      'web/scss': {
        transformGroup: 'scss',
        buildPath: `./dist/`,
        options,
        files: [
          {
            destination: 'index.scss',
            format: 'scss/variables',
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
    source: ['tokens/foundation/**/*.json', `tokens/themes/${theme}/**/*.json`],
    platforms: {
      'web/css': {
        transformGroup: 'css',
        buildPath: `./dist/${theme}/`,
        options,
        files: [
          {
            destination: 'index.css',
            format: 'css/variables-themed',
            filter: token => {
              return token.filePath.includes(theme)
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
const PLATFORM_WEB_CSS = 'web/css'
const PLATFORM_WEB_TAILWIND = 'web/css'

const platforms = [PLATFORM_WEB_CSS, PLATFORM_WEB_TAILWIND]
const themes = ['light', 'dark']

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
