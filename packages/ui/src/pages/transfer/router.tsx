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
				title: <FormattedMessage id="DtYelJ" defaultMessage="Transfer" />,
			},
		},
		// {
		// 	path: 'deploy',
		// 	element: <Deploy />,
		// 	handle: {
		// 		title: <FormattedMessage id="transfer.router.deploy" defaultMessage="Deploy package" />,
		// 	},
		// },
		{
			path: 'raw',
			element: <Raw />,
			handle: {
				title: <FormattedMessage id="3Rx6Qo" defaultMessage="Advanced" />,
			},
		},
	],
}

export default route
