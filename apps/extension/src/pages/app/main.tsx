import { enableMapSet } from 'immer'
import React from 'react'
import * as ReactDOM from 'react-dom/client'

import { RdtProvider } from 'ui/src/context/rdt-provider'
import { ReactQueryProvider } from 'ui/src/context/react-query-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'
import I18Provider from 'ui/src/i18n'
import en from 'ui/src/i18n/locales/en.json'
import pl from 'ui/src/i18n/locales/pl.json'

import { DappStatusProvider } from '@src/context/dapp-status-provider'
import { ThemeProvider } from '@src/context/theme-provider'
import '@src/styles/global-style.css'

import App from './app'

// codes: https://www.science.co.il/language/Locale-codes.php
const resources = {
	enUS: {
		translation: en,
	},
	pl: {
		translation: pl,
	},
}

const container: HTMLElement | null = document.getElementById('root')

enableMapSet()

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<ThemeProvider>
			<DappStatusProvider>
				<I18Provider resources={resources}>
					<ReactQueryProvider>
						<NoneSharedStoreProvider>
							<RdtProvider>
								<App />
							</RdtProvider>
						</NoneSharedStoreProvider>
					</ReactQueryProvider>
				</I18Provider>
			</DappStatusProvider>
		</ThemeProvider>
	</React.StrictMode>,
)
