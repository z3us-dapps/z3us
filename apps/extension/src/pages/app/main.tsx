import { enableMapSet } from 'immer'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'

import { FallbackLoading, RouterErrorBoundary } from 'ui/src/components/fallback-renderer'
import AppLayout from 'ui/src/components/layout'
import { loader } from 'ui/src/components/layout/routes/loader'
import { CompareWithDateProvider } from 'ui/src/context/compare-with-date-provider'
import { ImageProvider } from 'ui/src/context/images-provider'
import { ModalsProvider } from 'ui/src/context/modals-provider'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { ReactQueryProvider } from 'ui/src/context/react-query-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'
import accountsRoute from 'ui/src/pages/accounts/router'
import noMatchRoute from 'ui/src/pages/no-match/router'
import settingsRoute from 'ui/src/pages/settings/router'
import stakingRoute from 'ui/src/pages/staking/router'
import transferRoute from 'ui/src/pages/transfer/router'
import queryClient from 'ui/src/services/react-query'

import ExtensionLayout from '@src/components/layout'
import { DappStatusProvider } from '@src/context/dapp-status-provider'
import IntlProvider from '@src/context/intl-provider'
import { ClientProvider as LedgerClientProvider } from '@src/context/ledger-client-provider'
import { ClientProvider as MessageClientProvider } from '@src/context/message-client-provider'
import { ThemeProvider } from '@src/context/theme-provider'
import { ZdtProvider } from '@src/context/zdt-provider'
import interactionRoute from '@src/pages/interaction/router'
import keystoreRoute from '@src/pages/keystore/router'
import '@src/styles/global-style.css'

import RadixSettings from './components/settings'

const container: HTMLElement | null = document.getElementById('root')

enableMapSet()

let patchedSettingsRoute = settingsRoute
if (APP_RADIX) {
	// eslint-disable-next-line no-console
	import('@src/browser/content-script').catch(console.error)

	patchedSettingsRoute = {
		...settingsRoute,
		children: settingsRoute.children.map(child =>
			child.index === true
				? { ...child, handle: { ...((child as any).handle || {}), custom: <RadixSettings key="radix-settings" /> } }
				: child,
		),
	}
}

export const router = createHashRouter([
	{
		path: '/',
		element: <ExtensionLayout />,
		errorElement: <RouterErrorBoundary />,
		loader: loader(queryClient),
		children: [
			{
				index: true,
				element: <Navigate to={`/${accountsRoute.path}`} />,
			},
			{
				element: <AppLayout />,
				children: [accountsRoute, patchedSettingsRoute, stakingRoute, transferRoute],
			},
			keystoreRoute,
			interactionRoute,
		],
	},
	noMatchRoute,
])

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose())
}

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<ThemeProvider>
			<DappStatusProvider>
				<ReactQueryProvider queryClient={queryClient}>
					<NoneSharedStoreProvider>
						<IntlProvider>
							<ModalsProvider>
								<MessageClientProvider>
									<LedgerClientProvider>
										<RdtProvider>
											<ZdtProvider>
												<ImageProvider>
													<CompareWithDateProvider>
														<RouterProvider router={router} fallbackElement={<FallbackLoading />} />
													</CompareWithDateProvider>
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
