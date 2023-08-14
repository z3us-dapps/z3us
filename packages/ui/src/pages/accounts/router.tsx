import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Layout from './components/layout'

const Home = lazy(() => import('./home'))
const HomeSidebar = lazy(() => import('./home/sidebar'))
const Fungibles = lazy(() => import('./fungibles'))
const NonFungibles = lazy(() => import('./non-fungibles'))
const Resource = lazy(() => import('./resource'))

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
				sidebar: <HomeSidebar />,
			},
		},
		{
			path: ':accountId',
			children: [
				{
					path: 'fungibles',
					children: [
						{
							index: true,
							element: <Fungibles />,
							handle: {
								sidebar: <p>Fungibles activities</p>,
							},
						},
						{
							path: ':resourceId',
							element: <Resource />,
							handle: {
								sidebar: <p>Token details</p>,
							},
						},
					],
				},
				{
					path: 'non-fungibles',
					children: [
						{
							index: true,
							element: <NonFungibles />,
							handle: {
								sidebar: <p>NonFungibles activities</p>,
							},
						},
						{
							path: ':resourceId',
							element: <Resource />,
							handle: {
								sidebar: <p>Token details</p>,
							},
						},
					],
				},
			],
		},
	],
}

export default route
