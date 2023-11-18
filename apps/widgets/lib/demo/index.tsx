import type { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app'

declare global {
	interface Window {
		rdt?: RadixDappToolkit
	}
}

const containers = document.querySelectorAll('.z3us-demo')

containers.forEach(div =>
	ReactDOM.createRoot(div!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	),
)

export default {}
