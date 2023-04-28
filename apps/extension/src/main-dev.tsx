import React from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import Playground from './containers/playground'
import i18n from './i18n/i18n'

const container: HTMLElement | null = document.getElementById('root')
const containerElement: HTMLElement = container!

const root = createRoot(containerElement)

root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<Playground />
		</I18nextProvider>
	</React.StrictMode>,
)
