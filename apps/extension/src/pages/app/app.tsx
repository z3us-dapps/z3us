import React from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'

import { FallbackLoading, RouterErrorBoundary } from 'ui/src/components/fallback-renderer'
import AppLayout from 'ui/src/components/layout'
import accountsRoute from 'ui/src/pages/accounts/router'
import noMatchRoute from 'ui/src/pages/no-match/router'
import settingsRoute from 'ui/src/pages/settings/router'
import stakingRoute from 'ui/src/pages/staking/router'
import transferRoute from 'ui/src/pages/transfer/router'

import ExtensionLayout from '@src/components/layout'
import { config } from '@src/config'
import interactionRoute from '@src/pages/interaction/router'
import keystoreRoute from '@src/pages/keystore/router'

import RadixSettings from './components/settings'

let patchedSettingsRoute = settingsRoute
if (APP_RADIX && config.isExtensionContext) {
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
		children: [
			{
				index: true,
				element: <Navigate to={`/${accountsRoute.path}`} />,
			},
			{
				element: <AppLayout />,
				children: [accountsRoute, patchedSettingsRoute, stakingRoute, transferRoute, interactionRoute],
			},
			keystoreRoute,
			noMatchRoute,
		],
	},
])

if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose())
}

const App: React.FC = () => <RouterProvider router={router} fallbackElement={<FallbackLoading />} />

export default App
