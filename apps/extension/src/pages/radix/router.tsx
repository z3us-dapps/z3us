import { Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const Layout = lazy(() => import('./components/layout'))
const Pairing = lazy(() => import('./pairing'))
const Options = lazy(() => import('./options'))

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
		{
			path: 'options',
			element: <Options />,
		},
	],
}

export default route