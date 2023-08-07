import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Suspense from 'ui/src/components/suspense'

const Layout = lazy(() => import('./components/layout'))
const General = lazy(() => import('./general'))
const Accounts = lazy(() => import('./accounts'))
const AddressBook = lazy(() => import('./address-book'))

const route = {
	path: 'settings',
	element: (
		<Suspense>
			<Layout />
		</Suspense>
	),
	children: [
		{
			index: true,
			element: <Navigate to="/settings/general" />,
		},
		{
			path: 'general',
			element: (
				<Suspense>
					<General />
				</Suspense>
			),
		},
		{
			path: 'accounts',
			element: (
				<Suspense>
					<Accounts />
				</Suspense>
			),
		},
		{
			path: 'address-book',
			element: (
				<Suspense>
					<AddressBook />
				</Suspense>
			),
		},
	],
}

export default route
