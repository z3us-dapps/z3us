const path = require('path')

module.exports = {
	stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-actions',
		'@storybook/addon-viewport',
		'@storybook/addon-storysource',
		'storybook-addon-designs',
		'storybook-addon-pseudo-states',
		'storybook-dark-mode',
		'@storybook/preset-scss',
	],
	framework: '@storybook/react',
}
