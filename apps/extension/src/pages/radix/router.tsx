import { lazy } from 'react'

import Suspense from 'ui/src/components/suspense'

const Layout = lazy(() => import('./components/layout'))
const Pairing = lazy(() => import('./pairing'))
const Options = lazy(() => import('./options'))

const route = {
	path: 'radix',
	element: (
		<Suspense>
			<Layout />
		</Suspense>
	),
	children: [
		{
			index: true,
			element: (
				<Suspense>
					<Pairing />
				</Suspense>
			),
		},
		{
			path: 'pairing',
			element: (
				<Suspense>
					<Pairing />
				</Suspense>
			),
		},
		{
			path: 'options',
			element: (
				<Suspense>
					<Options />
				</Suspense>
			),
		},
	],
}

export default route
