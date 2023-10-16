const { mergeConfig } = require('vite')

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-viewport',
		'storybook-dark-mode',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	async viteFinal(config) {
		return mergeConfig(config, {
			plugins: [require('@vanilla-extract/vite-plugin').vanillaExtractPlugin()],
		})
	},
}
