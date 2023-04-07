import React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from '@src/popup/provider'

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
	<React.StrictMode>
		<Provider />
	</React.StrictMode>,
)
