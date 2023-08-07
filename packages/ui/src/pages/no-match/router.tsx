import { lazy } from 'react'

import Suspense from 'ui/src/components/suspense'

const NoMatch = lazy(() => import('./index'))

const route = {
	path: '*',
	element: (
		<Suspense>
			<NoMatch />
		</Suspense>
	),
}

export default route
