import { lazy } from 'react'

import Layout from './components/layout'

const Home = lazy(() => import('./home'))

const route = {
	path: 'staking',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Home />,
			handle: {
				validatorPanel: null,
			},
		},
	],
}

export default route
