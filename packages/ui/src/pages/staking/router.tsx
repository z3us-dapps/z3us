import { lazy } from 'react'

const Home = lazy(() => import('./home'))

const route = {
	path: 'staking',
	element: <Home />,
}

export default route
