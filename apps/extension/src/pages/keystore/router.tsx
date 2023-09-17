import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Layout = lazy(() => import('./components/layout'))
const Home = lazy(() => import('./home'))
const NewRadix = lazy(() => import('./radix'))

const route = {
	path: 'keystore/new',
	element: <Layout />,
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
}

export default route
