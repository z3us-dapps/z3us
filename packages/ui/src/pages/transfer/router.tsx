import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Layout from './components/layout'

const Fungibles = lazy(() => import('./fungibles/index'))
const NonFungibles = lazy(() => import('./non-fungibles'))
const Raw = lazy(() => import('./raw'))
const Deploy = lazy(() => import('./deploy'))

const route = {
	path: 'transfer',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Navigate to="/transfer/fungibles" />,
		},
		{
			path: 'fungibles',
			element: <Fungibles />,
		},
		{
			path: 'non-fungibles',
			element: <NonFungibles />,
		},
		{
			path: 'raw',
			element: <Raw />,
		},
		{
			path: 'deploy',
			element: <Deploy />,
		},
	],
}

export default route
