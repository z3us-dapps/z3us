import React from 'react'
import { HashRouter } from 'react-router-dom'
import { App } from './containers/app'
import 'ui/src/components-v2/system/global.css'

import './i18n'

export const Playground: React.FC = () => (
	<HashRouter>
		<App />
	</HashRouter>
)

export default Playground
