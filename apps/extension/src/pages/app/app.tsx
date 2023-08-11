import React from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'

import LayoutErrorBoundary from 'ui/src/components/error-boundary'
import Layout from 'ui/src/components/layout'
import Loader from 'ui/src/components/loader'
import accountsRoute from 'ui/src/pages/accounts/router'
import noMatchRoute from 'ui/src/pages/no-match/router'
import settingsRoute from 'ui/src/pages/settings/router'
import stakingRoute from 'ui/src/pages/staking/router'
import transferRoute from 'ui/src/pages/transfer/router'

import { config } from '@src/config'
import radixRoute from '@src/pages/radix/router'

if (APP_RADIX && config.isExtensionContext) {
	// eslint-disable-next-line no-console
	import('@src/browser/content-script').catch(console.error)
}

export const router = createHashRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <LayoutErrorBoundary />,
		children: [
			{
				index: true,
				element: <Navigate to={`/${accountsRoute.path}`} />,
			},
			accountsRoute,
			settingsRoute,
			stakingRoute,
			transferRoute,
			noMatchRoute,
		],
	},
	{
		path: '/radix',
		element: <Layout />, // @TODO: use custom layout for radix pages
		errorElement: <LayoutErrorBoundary />,
		children: radixRoute.children,
	},
])

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose())
}

const App: React.FC = () => <RouterProvider router={router} fallbackElement={<Loader />} />

export default App
