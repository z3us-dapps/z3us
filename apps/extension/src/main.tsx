import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@src/popup/provider'

const rootElement = document.getElementById('root')

const root = createRoot(rootElement)
root.render(
	<React.StrictMode>
		<Provider />
	</React.StrictMode>,
)

rootElement.style.display = 'block'
