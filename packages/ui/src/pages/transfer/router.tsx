import { lazy } from 'react'

import Layout from './components/layout'

const Home = lazy(() => import('./home'))
const Raw = lazy(() => import('./raw'))
const Deploy = lazy(() => import('./deploy'))

const route = {
	path: 'transfer',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Home />,
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
