import { lazy } from 'react'

const NoMatch = lazy(() => import('./index'))

const route = {
	path: '*',
	element: <NoMatch />,
}

export default route
