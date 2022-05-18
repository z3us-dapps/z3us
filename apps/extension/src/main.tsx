import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from '@src/popup/provider'

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
	<StrictMode>
		<Provider />
	</StrictMode>,
)
