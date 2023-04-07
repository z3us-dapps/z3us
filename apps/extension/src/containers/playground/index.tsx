import React from 'react'
import { HashRouter } from 'react-router-dom'

import 'ui/src/components-v2/system/global.css'

import { App } from './containers/app'

export const Playground: React.FC = () => (
	<HashRouter>
		<App />
	</HashRouter>
)

export default Playground
