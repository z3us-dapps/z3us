import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { App } from './containers/app'

import '@src/css/app.css'

export const Playground: React.FC = () => (
	<HashRouter>
		<App />
	</HashRouter>
)

export default Playground
