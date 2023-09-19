import { lazy } from 'react'

const Layout = lazy(() => import('./components/layout'))
const Home = lazy(() => import('./home'))
const NewRadix = lazy(() => import('./radix'))
const Export = lazy(() => import('./export'))
const Remove = lazy(() => import('./remove'))

const route = {
	path: 'keystore',
	element: <Layout />,
	children: [
		{
			path: 'new',
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: 'radix',
					element: <NewRadix />,
				},
			],
		},
		{
			path: 'export',
			element: <Export />,
		},
		{
			path: 'remove',
			element: <Remove />,
		},
	],
}

export default route
