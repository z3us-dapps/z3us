import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { zDecorator } from './decorators'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	viewport: {
		viewports: INITIAL_VIEWPORTS,
	},
	backgrounds: {
		default: 'white',
		values: [
			{
				name: 'white',
				value: '#fff',
			},
		],
	},
	darkMode: {
		// -  current: 'light',
		current: 'dark',
	},
}

export const decorators = [zDecorator]
