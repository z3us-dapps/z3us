import React from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import Playground from './containers/playground'
import i18n from './i18n/i18n'

const container = document.getElementById('root')

const root = createRoot(container) // createRoot(container!) if you use TypeScript

root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<Playground />
		</I18nextProvider>
	</React.StrictMode>,
)
