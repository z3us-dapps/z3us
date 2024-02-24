import { lazy } from 'react'

import Layout from './components/layout'

const Home = lazy(() => import('./home'))

const route = {
	path: 'airdrop',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Home />,
		},
	],
}

export default route
