import { lazy } from 'react'

import Layout from './components/layout'
import { ValidatorPanel } from './components/validator-panel'

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
		{
			path: ':validatorId',
			element: <Home />,
			handle: {
				validatorPanel: <ValidatorPanel />,
			},
		},
	],
}

export default route
