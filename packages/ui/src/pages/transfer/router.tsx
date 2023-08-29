import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Layout from './components/layout'

const Fungibles = lazy(() => import('./fungibles'))
const NonFungibles = lazy(() => import('./non-fungibles'))
const Raw = lazy(() => import('./raw'))
const Deploy = lazy(() => import('./deploy'))
const TokensNfts = lazy(() => import('./tokens-nfts'))

const route = {
	path: 'transfer',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Navigate to="/transfer/tokens-nfts" />,
		},
		{
			path: 'tokens-nfts',
			element: <TokensNfts />,
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
	],
}

export default route
