import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { darkTheme, globalStyles } from '../src/theme'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

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

export const decorators = [
	Story => {
		globalStyles()
		const element = window.document.body
		const isDarkMode = useDarkMode()
		if (isDarkMode) {
			element.classList.add(darkTheme)
		} else {
			element.classList.remove(darkTheme)
		}

		return (
			<div style={{ padding: '10px' }}>
				<Story />
			</div>
		)
	},
]
