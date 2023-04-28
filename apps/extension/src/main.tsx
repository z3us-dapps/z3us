import React from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import Playground from '@src/containers/playground'
import { Provider } from '@src/popup/provider'

import i18n from './i18n/i18n'

const isDevlopmentMode = import.meta.env.MODE === 'development'

const container: HTMLElement | null = document.getElementById('root')
const containerElement: HTMLElement = container!

const root = createRoot(containerElement)

root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>{isDevlopmentMode ? <Playground /> : <Provider />}</I18nextProvider>
	</React.StrictMode>,
)
