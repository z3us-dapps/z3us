import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Layout = lazy(() => import('./components/layout'))
const Pairing = lazy(() => import('./pairing'))

const route = {
	path: 'radix',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Navigate to="/radix/pairing" />,
		},
		{
			path: 'pairing',
			element: <Pairing />,
		},
	],
}

export default route
