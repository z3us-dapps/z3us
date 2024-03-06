import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import { FallbackLoading, RouterErrorBoundary } from 'ui/src/components/fallback-renderer'
import AppLayout from 'ui/src/components/layout'
import { loader } from 'ui/src/components/layout/routes/loader'
import { CompareWithDateProvider } from 'ui/src/context/compare-with-date-provider'
import { DappStatusContext, defaultState as defaultDappState } from 'ui/src/context/dapp-status'
import { ImageProvider } from 'ui/src/context/images-provider'
import { ModalsProvider } from 'ui/src/context/modals-provider'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { ReactQueryProvider } from 'ui/src/context/react-query-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'
import { ZdtContext, defaultState as defaultZdtState } from 'ui/src/context/zdt'
import accountsRoute from 'ui/src/pages/accounts/router'
import noMatchRoute from 'ui/src/pages/no-match/router'
import settingsRoute from 'ui/src/pages/settings/router'
import stakingRoute from 'ui/src/pages/staking/router'
import transferRoute from 'ui/src/pages/transfer/router'
import queryClient from 'ui/src/services/react-query'

import WebsiteLayout from './components/layout'
import IntlProvider from './intl-provider'

export const router = createHashRouter([
	{
		path: '/',
		element: <WebsiteLayout />,
		errorElement: <RouterErrorBoundary />,
		loader: loader(queryClient),
		children: [
			// Note: we don't want the redirect for z3us.com
			// {
			// 	index: true,
			// 	element: <Navigate to={`/${accountsRoute.path}`} />,
			// },
			{
				element: <AppLayout />,
				children: [accountsRoute, settingsRoute, stakingRoute, transferRoute],
			},
		],
	},
	noMatchRoute,
])

type Props = { dehydratedState?: any }

const AppPage: React.FC<Props> = ({ dehydratedState }: Props) => (
	<DappStatusContext.Provider value={defaultDappState}>
		<ReactQueryProvider queryClient={queryClient} dehydratedState={dehydratedState}>
			<NoneSharedStoreProvider>
				<IntlProvider>
					<ModalsProvider>
						<RdtProvider>
							<ZdtContext.Provider value={defaultZdtState}>
								<ImageProvider>
									<CompareWithDateProvider>
										<RouterProvider router={router} fallbackElement={<FallbackLoading />} />
									</CompareWithDateProvider>
								</ImageProvider>
							</ZdtContext.Provider>
						</RdtProvider>
					</ModalsProvider>
				</IntlProvider>
			</NoneSharedStoreProvider>
		</ReactQueryProvider>
	</DappStatusContext.Provider>
)

export default AppPage
