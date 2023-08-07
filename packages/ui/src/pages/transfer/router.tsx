import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Suspense from 'ui/src/components/suspense'

const Layout = lazy(() => import('./components/layout'))
const Fungibles = lazy(() => import('./fungibles'))
const NonFungibles = lazy(() => import('./non-fungibles'))
const Raw = lazy(() => import('./raw'))
const Deploy = lazy(() => import('./deploy'))

const route = {
	path: 'transfer',
	element: (
		<Suspense>
			<Layout />
		</Suspense>
	),
	children: [
		{
			index: true,
			element: <Navigate to="/transfer/fungibles" />,
		},
		{
			path: 'fungibles',
			element: (
				<Suspense>
					<Fungibles />
				</Suspense>
			),
		},
		{
			path: 'non-fungibles',
			element: (
				<Suspense>
					<NonFungibles />
				</Suspense>
			),
		},
		{
			path: 'raw',
			element: (
				<Suspense>
					<Raw />
				</Suspense>
			),
		},
		{
			path: 'deploy',
			element: (
				<Suspense>
					<Deploy />
				</Suspense>
			),
		},
	],
}

export default route
