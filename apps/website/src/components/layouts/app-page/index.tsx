import { DappStatusContext } from 'packages/ui/src/context/dapp-status'
import React, { Suspense } from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'

import LayoutErrorBoundary from 'ui/src/components/error-boundary'
import I18Provider from 'ui/src/components/i18n'
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

import { LandingPage } from '../landing-page'

export const router = createHashRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <LayoutErrorBoundary />,
		children: [
			{
				index: true,
				element: (
					<Suspense>
						<LandingPage />
					</Suspense>
				),
			},
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
	<DappStatusContext.Provider value={null}>
		<I18Provider>
			<ReactQueryProvider dehydratedState={dehydratedState}>
				<NoneSharedStoreProvider>
					<RdtProvider>
						<RouterProvider router={router} fallbackElement={<Loader />} />
					</RdtProvider>
				</NoneSharedStoreProvider>
			</ReactQueryProvider>
		</I18Provider>
	</DappStatusContext.Provider>
)

export default AppPage
