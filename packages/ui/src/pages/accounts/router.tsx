import { lazy } from 'react'

import Layout from './components/layout'

const Home = lazy(() => import('./home'))
// const HomeSidebar = lazy(() => import('./home/sidebar'))
const Account = lazy(() => import('./account'))
// const AccountSidebar = lazy(() => import('./account/sidebar'))
const Tokens = lazy(() => import('./tokens'))
const Nfts = lazy(() => import('./nfts'))

const route = {
	path: 'accounts',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Home />,
			handle: {
				// sidebar: <HomeSidebar />,
				sidebar: <p>home sidebar</p>,
			},
		},
		{
			path: ':accountId',
			element: <Account />,
			handle: {
				// sidebar: <AccountSidebar />,
				sidebar: <p>account sidebar</p>,
			},
		},
		{
			path: ':accountId/tokens',
			element: <Tokens />,
			handle: {
				sidebar: <p>account tokens sidebar</p>,
			},
		},
		{
			path: ':accountId/tokens/:resourceId',
			element: <Tokens />,
			handle: {
				sidebar: <p>account resource tokens sidebar</p>,
			},
		},
		{
			path: ':accountId/nfts',
			element: <Nfts />,
			handle: {
				sidebar: <p>nfts activities</p>,
			},
		},
		{
			path: ':accountId/nfts/:resourceId',
			element: <Nfts />,
			handle: {
				sidebar: <p>account resource nfts sidebar</p>,
			},
		},
	],
}

export default route
