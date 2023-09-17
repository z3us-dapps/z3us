import React from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'

import LayoutErrorBoundary from 'ui/src/components/error-boundary'
import AppLayout from 'ui/src/components/layout'
import Loader from 'ui/src/components/loader'
import accountsRoute from 'ui/src/pages/accounts/router'
import noMatchRoute from 'ui/src/pages/no-match/router'
import settingsRoute from 'ui/src/pages/settings/router'
import stakingRoute from 'ui/src/pages/staking/router'
import transferRoute from 'ui/src/pages/transfer/router'

import ExtensionLayout from '@src/components/layout'
import { config } from '@src/config'
import keystoreRoute from '@src/pages/keystore/router'

import RadixSettings from './components/settings'

let patchedSettingsRoute = settingsRoute
if (APP_RADIX && config.isExtensionContext) {
	// eslint-disable-next-line no-console
	import('@src/browser/content-script').catch(console.error)

	patchedSettingsRoute = {
		...settingsRoute,
		children: settingsRoute.children.map(child =>
			child.path === 'general'
				? { ...child, handle: { ...((child as any).handle || {}), custom: <RadixSettings key="radix-settings" /> } }
				: child,
		),
	}
}

export const router = createHashRouter([
	{
		path: '/',
		element: <ExtensionLayout />,
		errorElement: <LayoutErrorBoundary />,
		children: [
			{
				index: true,
				element: <Navigate to={`/${accountsRoute.path}`} />,
			},
			{
				element: <AppLayout />,
				children: [accountsRoute, patchedSettingsRoute, stakingRoute, transferRoute, keystoreRoute, noMatchRoute],
			},
		],
	},
])

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose())
}

const App: React.FC = () => <RouterProvider router={router} fallbackElement={<Loader />} />

export default App
