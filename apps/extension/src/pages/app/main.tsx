import { enableMapSet } from 'immer'
import React from 'react'
import * as ReactDOM from 'react-dom/client'

import { BalancesProvider } from 'ui/src/context/balances/provider'
import { CompareWithDateProvider } from 'ui/src/context/compare-with-date-provider'
import { ImageProvider } from 'ui/src/context/images-provider'
import { ModalsProvider } from 'ui/src/context/modals-provider'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { ReactQueryProvider } from 'ui/src/context/react-query-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'

import { DappStatusProvider } from '@src/context/dapp-status-provider'
import IntlProvider from '@src/context/intl-provider'
import { ClientProvider as LedgerClientProvider } from '@src/context/ledger-client-provider'
import { ClientProvider as MessageClientProvider } from '@src/context/message-client-provider'
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
				<ReactQueryProvider>
					<NoneSharedStoreProvider>
						<IntlProvider>
							<ModalsProvider>
								<MessageClientProvider>
									<LedgerClientProvider>
										<RdtProvider>
											<ZdtProvider>
												<ImageProvider>
													<BalancesProvider>
														<CompareWithDateProvider>
															<App />
														</CompareWithDateProvider>
													</BalancesProvider>
												</ImageProvider>
											</ZdtProvider>
										</RdtProvider>
									</LedgerClientProvider>
								</MessageClientProvider>
							</ModalsProvider>
						</IntlProvider>
					</NoneSharedStoreProvider>
				</ReactQueryProvider>
			</DappStatusProvider>
		</ThemeProvider>
	</React.StrictMode>,
)
