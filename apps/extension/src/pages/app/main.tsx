import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { enableMapSet } from 'immer'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import I18Provider from 'ui/src/components/i18n'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { ReactQueryProvider } from 'ui/src/context/react-query-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'

import { config } from '@src/config'
import '@src/styles/global-style.css'

import App from './app'

const container: HTMLElement | null = document.getElementById('root')

enableMapSet()

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<I18Provider>
			<ReactQueryProvider>
				<NoneSharedStoreProvider>
					<RdtProvider>
						<HashRouter>
							<App />
							{config.isDevlopmentMode && <ReactQueryDevtools initialIsOpen={false} />}
						</HashRouter>
					</RdtProvider>
				</NoneSharedStoreProvider>
			</ReactQueryProvider>
		</I18Provider>
	</React.StrictMode>,
)
