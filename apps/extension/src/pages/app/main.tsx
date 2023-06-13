import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextProvider } from 'react-i18next'
import { HashRouter } from 'react-router-dom'

import 'ui/src/components-v2/system/global.css'

import { FallbackRenderer } from '@src/components/fallback-renderer'
import { RdtProvider } from '@src/context/rdt-provider'
import { NoneSharedStoreProvider } from '@src/context/state-provider'
import i18n from '@src/i18n/i18n'
import rdt from '@src/radix/rdt'

import App from './app'

const container: HTMLElement | null = document.getElementById('root')

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<HashRouter>
				<RdtProvider value={rdt}>
					<NoneSharedStoreProvider>
						<ErrorBoundary fallbackRender={FallbackRenderer}>
							<App />
						</ErrorBoundary>
					</NoneSharedStoreProvider>
				</RdtProvider>
			</HashRouter>
		</I18nextProvider>
	</React.StrictMode>,
)
