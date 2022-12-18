import React from 'react'
import { globalStyles } from 'ui/src/theme'

import '@src/css/app.css'

export const Playground: React.FC = () => {
	globalStyles()

	return <div>playground</div>
}

export default Playground
