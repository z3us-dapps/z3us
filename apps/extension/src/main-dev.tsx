import React from 'react'
import { render } from 'react-dom'
import Playground from './containers/playground'

const rootElement = document.getElementById('root')

render(
	<React.StrictMode>
		<Playground />
	</React.StrictMode>,
	rootElement,
)

rootElement.style.display = 'block'
