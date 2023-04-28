/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import * as ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next'
import { HashRouter } from 'react-router-dom'

import 'ui/src/components-v2/system/global.css'

import i18n from './i18n/i18n'

const Playground = React.lazy(() => import('@src/containers/playground'))
const Provider = React.lazy(() => import('@src/popup/provider'))

const App = React.lazy(() => import('@src/pages'))

const isDevlopmentMode = import.meta.env.MODE === 'development'
const isProductionMode = import.meta.env.MODE === 'production'
const container: HTMLElement | null = document.getElementById('root')

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<HashRouter>
				<React.Suspense fallback={<div />}>
					{isDevlopmentMode && <App />}
					{isProductionMode && <App />}

					{/* {isDevlopmentMode && <App />} */}
					{/* {isProductionMode && <Provider />} */}
				</React.Suspense>
			</HashRouter>
		</I18nextProvider>
	</React.StrictMode>,
)
