import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { darkTheme, globalStyles } from '../src/theme'

// import '../src/components-v2/system/global.css'

export const zDecorator = Story => {
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
}
