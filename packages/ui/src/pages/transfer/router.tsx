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
				title: <Translation capitalizeFirstLetter text="transfer.tokensNfts.title" />,
			},
		},
		{
			path: 'deploy',
			element: <Deploy />,
			handle: {
				title: <Translation capitalizeFirstLetter text="transfer.deploy.title" />,
			},
		},
		{
			path: 'raw',
			element: <Raw />,
			handle: {
				title: <Translation capitalizeFirstLetter text="transfer.raw.title" />,
			},
		},
	],
}

export default route
