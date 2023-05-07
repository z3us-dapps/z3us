import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { HashRouter } from 'react-router-dom'

import 'ui/src/components-v2/system/global.css'

import { RdtProvider } from '@src/context/rdt-provider'
import i18n from '@src/i18n/i18n'
import App from '@src/pages'
import rdt from '@src/radix/rdt'

const isDevlopmentMode = import.meta.env.MODE === 'development'
const isProductionMode = import.meta.env.MODE === 'production'
const container: HTMLElement | null = document.getElementById('root')

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<HashRouter>
				<RdtProvider value={rdt}>
					<React.Suspense fallback={<div />}>
						{isDevlopmentMode && <App />}
						{isProductionMode && <App />}
					</React.Suspense>
				</RdtProvider>
			</HashRouter>
		</I18nextProvider>
	</React.StrictMode>,
)
