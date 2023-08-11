import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Layout from './components/layout'

const General = lazy(() => import('./general'))
const Accounts = lazy(() => import('./accounts'))
const AddressBook = lazy(() => import('./address-book'))

const route = {
	path: 'settings',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Navigate to="/settings/general" />,
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
