import { lazy } from 'react'

import Layout from './components/layout'
import { MobileNavigation } from './components/navigation'

const General = lazy(() => import('./general'))
const Accounts = lazy(() => import('./accounts'))
const AddressBook = lazy(() => import('./address-book'))

const route = {
	path: 'settings',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <MobileNavigation />,
		},
		{
			path: 'general',
			element: <General />,
		},
		{
			path: 'accounts',
			element: <Accounts />,
		},
		{
			path: 'address-book',
			element: <AddressBook />,
		},
	],
}

export default route
