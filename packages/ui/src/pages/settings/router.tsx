import { lazy } from 'react'

import Layout from './components/layout'

const Home = lazy(() => import('./home'))
const General = lazy(() => import('./general'))
const Accounts = lazy(() => import('./accounts'))
const AddressBook = lazy(() => import('./address-book'))

const route = {
	path: 'settings',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Home />,
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
