import { DappStatusContext, defaultState as defaultDappState } from 'packages/ui/src/context/dapp-status'
import { ZdtContext, defaultState as defaultZdtState } from 'packages/ui/src/context/zdt'
import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import LayoutErrorBoundary from 'ui/src/components/error-boundary'
import Layout from 'ui/src/components/layout'
import Loader from 'ui/src/components/loader'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { ReactQueryProvider } from 'ui/src/context/react-query-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'
import accountsRoute from 'ui/src/pages/accounts/router'
import noMatchRoute from 'ui/src/pages/no-match/router'
import settingsRoute from 'ui/src/pages/settings/router'
import stakingRoute from 'ui/src/pages/staking/router'
import transferRoute from 'ui/src/pages/transfer/router'

import IntlProvider from './intl-provider'

// import { LandingPage } from '../landing-page'

export const router = createHashRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <LayoutErrorBoundary />,
		children: [
			// {
			// 	index: true,
			// 	element: (
			// 		<Suspense>
			// 			<LandingPage />
			// 		</Suspense>
			// 	),
			// },
			accountsRoute,
			settingsRoute,
			stakingRoute,
			transferRoute,
			noMatchRoute,
		],
	},
])

type Props = { dehydratedState?: any }

const AppPage: React.FC<Props> = ({ dehydratedState }: Props) => (
	<DappStatusContext.Provider value={defaultDappState}>
		<ReactQueryProvider dehydratedState={dehydratedState}>
			<NoneSharedStoreProvider>
				<IntlProvider>
					<ZdtContext.Provider value={defaultZdtState}>
						<RdtProvider>
							<RouterProvider router={router} fallbackElement={<Loader />} />
						</RdtProvider>
					</ZdtContext.Provider>
				</IntlProvider>
			</NoneSharedStoreProvider>
		</ReactQueryProvider>
	</DappStatusContext.Provider>
)

export default AppPage
