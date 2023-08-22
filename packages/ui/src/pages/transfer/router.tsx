import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Layout from './components/layout'

const Fungibles = lazy(() => import('./fungibles'))
const NonFungibles = lazy(() => import('./non-fungibles'))
const Raw = lazy(() => import('./raw'))
const Deploy = lazy(() => import('./deploy'))
const Demo = lazy(() => import('./demo'))

const route = {
	path: 'transfer',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Navigate to="/transfer/tokens" />,
		},
		{
			path: 'tokens',
			element: <Fungibles />,
		},
		{
			path: 'nfts',
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
		{
			path: 'demo',
			element: <Demo />,
		},
	],
}

export default route
