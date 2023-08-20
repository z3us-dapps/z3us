import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Layout from './components/layout'

const Home = lazy(() => import('./home'))
// const HomeSidebar = lazy(() => import('./home/sidebar'))
const Account = lazy(() => import('./account'))
// const AccountSidebar = lazy(() => import('./account/sidebar'))
const Fungibles = lazy(() => import('./fungibles'))
const NonFungibles = lazy(() => import('./non-fungibles'))
// const Resource = lazy(() => import('./resource'))

const route = {
	path: 'accounts',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Navigate to="/accounts/-" />,
		},
		{
			path: '-',
			element: <Home />,
			handle: {
				// sidebar: <HomeSidebar />,
				sidebar: <p> home sidebar</p>,
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
			path: ':accountId/fungibles',
			element: <Fungibles />,
			handle: {
				sidebar: <p>account tokens sidebar</p>,
			},
		},
		{
			path: ':accountId/fungibles/:resourceId',
			element: <Fungibles />,
			handle: {
				sidebar: <p>account resource tokens sidebar</p>,
			},
		},
		{
			path: ':accountId/non-fungibles',
			element: <NonFungibles />,
			handle: {
				sidebar: <p>nfts activities</p>,
			},
		},
		{
			path: ':accountId/non-fungibles/:resourceId',
			element: <NonFungibles />,
			handle: {
				sidebar: <p>account resource nfts sidebar</p>,
			},
		},
	],
}

export default route
