import React from 'react'
import { render } from 'react-dom'
import { I18nextProvider } from 'react-i18next'

import Playground from './containers/playground'
import i18n from './i18n/i18n'

const rootElement = document.getElementById('root')

render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<Playground />
		</I18nextProvider>
	</React.StrictMode>,
	rootElement,
)

rootElement.style.display = 'block'
