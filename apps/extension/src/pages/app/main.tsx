import { enableMapSet } from 'immer'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'

import { FallbackLoading, RouterErrorBoundary } from 'ui/src/components/fallback-renderer'
import AppLayout from 'ui/src/components/layout'
import { loader } from 'ui/src/components/layout/routes/loader'
import { ModalsProvider } from 'ui/src/context/modals-provider'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { ReactQueryProvider } from 'ui/src/context/react-query-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'
import TokensProvider from 'ui/src/context/tokens/provider'
import accountsRoute from 'ui/src/pages/accounts/router'
import noMatchRoute from 'ui/src/pages/no-match/router'
import settingsRoute from 'ui/src/pages/settings/router'
import transferRoute from 'ui/src/pages/transfer/router'
import queryClient from 'ui/src/services/react-query'

import ExtensionLayout from '@src/components/layout'
import { DappStatusProvider } from '@src/context/dapp-status-provider'
import IntlProvider from '@src/context/intl-provider'
import { ClientProvider as LedgerClientProvider } from '@src/context/ledger-client-provider'
import { ClientProvider as MessageClientProvider } from '@src/context/message-client-provider'
import { Provider as RuntimeIdProvider } from '@src/context/runtime-id-provider'
import { ThemeProvider } from '@src/context/theme-provider'
import { ZdtProvider } from '@src/context/zdt-provider'
import interactionRoute from '@src/pages/interaction/router'
import keystoreRoute from '@src/pages/keystore/router'
import '@src/styles/global-style.css'

import RadixSettings from './components/settings/radix'
import WebAuthnSettings from './components/settings/webauthn'

const container: HTMLElement | null = document.getElementById('root')

enableMapSet()

let patchedSettingsRoute = {
	...settingsRoute,
	children: settingsRoute.children.map(child =>
		child.path === 'wallet'
			? { ...child, handle: { ...((child as any).handle || {}), custom: <WebAuthnSettings key="webauthn-settings" /> } }
			: child,
	),
}

if (APP_RADIX) {
	// eslint-disable-next-line no-console
	import('@src/browser/content-script').catch(console.error)

	patchedSettingsRoute = {
		...patchedSettingsRoute,
		children: patchedSettingsRoute.children.map(child =>
			child.index === true
				? { ...child, handle: { ...((child as any).handle || {}), custom: <RadixSettings key="radix-settings" /> } }
				: child,
		),
	}
}

export const router: ReturnType<typeof createHashRouter> = createHashRouter([
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
				children: [accountsRoute, patchedSettingsRoute, transferRoute],
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
		<RuntimeIdProvider>
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
													<TokensProvider>
														<RouterProvider router={router} fallbackElement={<FallbackLoading />} />
													</TokensProvider>
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
		</RuntimeIdProvider>
	</React.StrictMode>,
)
