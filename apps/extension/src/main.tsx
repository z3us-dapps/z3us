import React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from '@src/popup/provider'

const container: HTMLElement | null = document.getElementById('root')
const containerElement: HTMLElement = container!

const root = createRoot(containerElement)

root.render(
	<React.StrictMode>
		<Provider />
	</React.StrictMode>,
)
