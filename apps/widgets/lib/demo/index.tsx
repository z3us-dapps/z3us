import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app'

const containers = document.querySelectorAll('.z3us-demo')

containers.forEach(div =>
	ReactDOM.createRoot(div!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	),
)
