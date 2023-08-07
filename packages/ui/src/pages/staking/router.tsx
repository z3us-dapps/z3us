import { lazy } from 'react'

import Suspense from 'ui/src/components/suspense'

const Home = lazy(() => import('./home'))

const route = {
	path: 'staking',
	element: (
		<Suspense>
			<Home />
		</Suspense>
	),
}

export default route
