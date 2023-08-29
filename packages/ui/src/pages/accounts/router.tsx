import { lazy } from 'react'

import Layout from './components/layout'
import { AccountBreadcrumb } from './components/layout/components/breadcrumbs/account-breadcrumb'
import { LinkBreadcrumb } from './components/layout/components/breadcrumbs/link-breadcrumb'
import { ResourceBreadcrumb } from './components/layout/components/breadcrumbs/resource-breadcrumb'

const Home = lazy(() => import('./home'))
const Account = lazy(() => import('./account'))
const Tokens = lazy(() => import('./tokens'))
const Nfts = lazy(() => import('./nfts'))

const ActivityList = lazy(() => import('./components/activity-list'))
const ResourceDetails = lazy(() => import('./components/resource-details'))

const route = {
	path: 'accounts',
	element: <Layout />,
	handle: {
		crumb: () => <LinkBreadcrumb to="/accounts" translationKey="accounts.breadcrumbs.accounts" />,
		sidebar: <ActivityList />,
	},
	children: [
		{
			index: true,
			element: <Home />,
		},
		{
			path: ':accountId',
			handle: {
				crumb: () => <AccountBreadcrumb />,
			},
			children: [
				{
					index: true,
					element: <Account />,
				},
				{
					path: 'tokens',
					element: <Tokens />,
					handle: {
						crumb: ({ accountId }) => (
							<LinkBreadcrumb to={`/accounts/${accountId}/tokens`} translationKey="accounts.breadcrumbs.tokens" />
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: () => <ResourceBreadcrumb resourceType="token" />,
								sidebar: <ResourceDetails />,
							},
						},
					],
				},
				{
					path: 'nfts',
					element: <Nfts />,
					handle: {
						crumb: ({ accountId }) => (
							<LinkBreadcrumb to={`/accounts/${accountId}/nfts`} translationKey="accounts.breadcrumbs.nfts" />
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: () => <ResourceBreadcrumb resourceType="nft" />,
								sidebar: <ResourceDetails />,
							},
						},
					],
				},
			],
		},
	],
}

export default route
