import { lazy } from 'react'
import { FormattedMessage } from 'react-intl'

import Layout from './components/layout'

const Home = lazy(() => import('./home'))
const Raw = lazy(() => import('./raw'))
// const Deploy = lazy(() => import('./deploy'))

const route = {
	path: 'transfer',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Home />,
			handle: {
				title: <FormattedMessage defaultMessage="Transfer" />,
			},
		},
		// {
		// 	path: 'deploy',
		// 	element: <Deploy />,
		// 	handle: {
		// 		title: <FormattedMessage defaultMessage="Deploy package" />,
		// 	},
		// },
		{
			path: 'raw',
			element: <Raw />,
			handle: {
				title: <FormattedMessage defaultMessage="Advanced" />,
			},
		},
	],
}

export default route
