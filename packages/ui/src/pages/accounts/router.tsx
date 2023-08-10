import { lazy } from 'react'

import Suspense from 'ui/src/components/suspense'

const Layout = lazy(() => import('./components/layout'))
const Home = lazy(() => import('./home'))
const HomeSidebar = lazy(() => import('./home/sidebar'))
const Fungibles = lazy(() => import('./fungibles'))
const NonFungibles = lazy(() => import('./non-fungibles'))
const Resource = lazy(() => import('./resource'))

const route = {
	path: 'accounts',
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
					<Home />
				</Suspense>
			),
			handle: {
				sidebar: (
					<Suspense>
						<HomeSidebar />
					</Suspense>
				),
			},
		},
		{
			path: ':account',
			children: [
				{
					path: 'fungibles',
					children: [
						{
							index: true,
							element: (
								<Suspense>
									<Fungibles />
								</Suspense>
							),
							handle: {
								sidebar: <p>Fungibles activities</p>,
							},
						},
						{
							path: ':resource',
							element: (
								<Suspense>
									<Resource />
								</Suspense>
							),
							handle: {
								sidebar: <p>Token details</p>,
							},
						},
					],
				},
				{
					path: 'non-fungibles',
					children: [
						{
							index: true,
							element: (
								<Suspense>
									<NonFungibles />
								</Suspense>
							),
							handle: {
								sidebar: <p>NonFungibles activities</p>,
							},
						},
						{
							path: ':resource',
							element: (
								<Suspense>
									<Resource />
								</Suspense>
							),
							handle: {
								sidebar: <p>Token details</p>,
							},
						},
					],
				},
			],
		},
	],
}

export default route
