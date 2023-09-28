import { lazy } from 'react'

const Home = lazy(() => import('./home'))

const route = {
	path: 'interaction/:interactionId',
	element: <Home />,
}

export default route
