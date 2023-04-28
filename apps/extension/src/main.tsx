import React from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'

import i18n from './i18n/i18n'

const Playground = React.lazy(() => import('@src/containers/playground'))
const Provider = React.lazy(() => import('@src/popup/provider'))

const isDevlopmentMode = import.meta.env.MODE === 'development'

const container: HTMLElement | null = document.getElementById('root')

const root = createRoot(container!)

root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<React.Suspense fallback={<div />}>{isDevlopmentMode ? <Playground /> : <Provider />}</React.Suspense>
		</I18nextProvider>
	</React.StrictMode>,
)
