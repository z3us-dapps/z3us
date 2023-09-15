import { enableMapSet } from 'immer'
import React from 'react'
import * as ReactDOM from 'react-dom/client'

import { RdtProvider } from 'ui/src/context/rdt-provider'
import { ReactQueryProvider } from 'ui/src/context/react-query-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'
import I18Provider from 'ui/src/i18n'

import { DappStatusProvider } from '@src/context/dapp-status-provider'
import { ThemeProvider } from '@src/context/theme-provider'
import { ZdtProvider } from '@src/context/zdt-provider'
import '@src/styles/global-style.css'

import App from './app'

const container: HTMLElement | null = document.getElementById('root')

enableMapSet()

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<ThemeProvider>
			<DappStatusProvider>
				<I18Provider>
					<ReactQueryProvider>
						<NoneSharedStoreProvider>
							<RdtProvider>
								<ZdtProvider>
									<App />
								</ZdtProvider>
							</RdtProvider>
						</NoneSharedStoreProvider>
					</ReactQueryProvider>
				</I18Provider>
			</DappStatusProvider>
		</ThemeProvider>
	</React.StrictMode>,
)
