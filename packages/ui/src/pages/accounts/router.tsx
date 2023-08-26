import { lazy } from 'react'

import Layout from './components/layout'

const Accounts = lazy(() => import('./accounts'))
// const HomeSidebar = lazy(() => import('./home/sidebar'))
const Account = lazy(() => import('./account'))
// const AccountSidebar = lazy(() => import('./account/sidebar'))
const Tokens = lazy(() => import('./tokens'))
const Nfts = lazy(() => import('./nfts'))

const route = {
	path: 'accounts',
	element: <Layout />,
	children: [
		{
			index: true,
			element: <Accounts />,
			handle: {
				sidebar: <p>accounts sidebar</p>,
			},
		},
		{
			path: ':accountId',
			children: [
				{
					index: true,
					element: <Account />,
					handle: {
						sidebar: <p>account sidebar</p>,
					},
				},
				{
					path: 'tokens',
					element: <Tokens />,
					children: [
						{
							index: true,
							handle: {
								sidebar: <p>tokens sidebar</p>,
							},
						},
						{
							path: ':resourceId',
							handle: {
								sidebar: <p>Token sidebar</p>,
							},
						},
					],
				},
				{
					path: 'nfts',
					element: <Nfts />,
					children: [
						{
							index: true,
							handle: {
								sidebar: <p>NFTs sidebar</p>,
							},
						},
						{
							path: ':resourceId',
							handle: {
								sidebar: <p>NFT sidebar</p>,
							},
						},
					],
				},
			],
		},
	],
}

export default route
