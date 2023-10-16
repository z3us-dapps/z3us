import { dirname, join } from "path";
const { mergeConfig } = require('vite')

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@storybook/addon-interactions"),
		getAbsolutePath("@storybook/addon-viewport"),
		getAbsolutePath("storybook-dark-mode"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
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

function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, "package.json")));
}
