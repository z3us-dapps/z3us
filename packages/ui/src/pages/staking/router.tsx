import { lazy } from 'react'

import Layout from './components/layout'
import { ValidatorPanel } from './components/validator-panel'

const Home = lazy(() => import('./home'))
const HomeSidebar = lazy(() => import('./home/sidebar'))

const route = {
	path: 'staking',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Home />,
			handle: {
				sidebar: <HomeSidebar />,
				validatorPanel: null,
			},
		},
		{
			path: ':validatorId',
			element: <Home />,
			handle: {
				sidebar: <HomeSidebar />,
				validatorPanel: <ValidatorPanel />,
			},
		},
	],
}

export default route
