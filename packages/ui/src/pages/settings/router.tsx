import { lazy } from 'react'

import Layout from './components/layout'

const Wallet = lazy(() => import('./wallet'))
const General = lazy(() => import('./general'))
const Personas = lazy(() => import('./personas'))
const Accounts = lazy(() => import('./accounts'))
const AddressBook = lazy(() => import('./address-book'))
const AuthorizedDapps = lazy(() => import('./authorized-dapps'))

const route = {
	path: 'settings',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <General />,
		},
		{
			path: 'wallet',
			element: <Wallet />,
		},
		{
			path: 'personas',
			element: <Personas />,
		},
		{
			path: 'accounts',
			element: <Accounts />,
		},
		{
			path: 'address-book',
			element: <AddressBook />,
		},
		{
			path: 'authorized-dapps',
			element: <AuthorizedDapps />,
		},
	],
}

export default route
