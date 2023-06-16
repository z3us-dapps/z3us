import { enableMapSet } from 'immer'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HashRouter } from 'react-router-dom'

import 'ui/src/components-v2/system/global.css'

import { config } from '@src/config'
import { RdtProvider } from '@src/context/rdt-provider'
import { NoneSharedStoreProvider } from '@src/context/state-provider'
import i18n from '@src/i18n/i18n'
import rdt from '@src/services/rdt'
import newQueryClient from '@src/services/react-query'

import App from './app'

const queryClient = newQueryClient(window.localStorage)

const container: HTMLElement | null = document.getElementById('root')

enableMapSet()

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<QueryClientProvider client={queryClient}>
				<RdtProvider value={rdt}>
					<NoneSharedStoreProvider>
						<HashRouter>
							<App />
							{config.isDevlopmentMode && <ReactQueryDevtools initialIsOpen />}
						</HashRouter>
					</NoneSharedStoreProvider>
				</RdtProvider>
			</QueryClientProvider>
		</I18nextProvider>
	</React.StrictMode>,
)
