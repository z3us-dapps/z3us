import React from 'react'
import { render } from 'react-dom'
import { Provider } from '@src/popup/provider'

const rootElement = document.getElementById('root')
render(
	<React.StrictMode>
		<Provider />
	</React.StrictMode>,
	rootElement,
)

rootElement.style.display = 'block'
