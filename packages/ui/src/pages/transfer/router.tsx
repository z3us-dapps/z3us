import { lazy } from 'react'

import Translation from 'ui/src/components/translation'

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
			handle: {
				title: <Translation capitalizeFirstLetter text="transfer.navigation.homeTitle" />,
			},
		},
		{
			path: 'raw',
			element: <Raw />,
			handle: {
				title: <Translation capitalizeFirstLetter text="transfer.navigation.rawTitle" />,
			},
		},
		{
			path: 'deploy',
			element: <Deploy />,
			handle: {
				title: <Translation capitalizeFirstLetter text="transfer.navigation.deployTitle" />,
			},
		},
	],
}

export default route
