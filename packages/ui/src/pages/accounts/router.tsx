import BigNumber from 'bignumber.js'
import { lazy } from 'react'
import { FormattedMessage } from 'react-intl'

import Layout from './components/layout'
import { AccountBreadcrumb } from './components/layout/components/breadcrumbs/account-breadcrumb'
import { LinkBreadcrumb } from './components/layout/components/breadcrumbs/link-breadcrumb'
import { ResourceBreadcrumb } from './components/layout/components/breadcrumbs/resource-breadcrumb'
import { BackButton } from './components/layout/components/mobile/back-button'

BigNumber.set({
	ROUNDING_MODE: BigNumber.ROUND_HALF_UP,
	EXPONENTIAL_AT: [-30, 30],
})

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
		crumb: () => (
			<LinkBreadcrumb to="/accounts">
				<FormattedMessage id="accounts.breadcrumbs.accounts" defaultMessage="All accounts" />
			</LinkBreadcrumb>
		),
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
						backButton: <BackButton key="tokens" />,
						crumb: ({ accountId }) => (
							<LinkBreadcrumb key={accountId} to={`/accounts/${accountId}/tokens`}>
								<FormattedMessage id="accounts.breadcrumbs.tokens" defaultMessage="Tokens" />
							</LinkBreadcrumb>
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
						backButton: <BackButton key="nfts" />,
						crumb: ({ accountId }) => (
							<LinkBreadcrumb key={accountId} to={`/accounts/${accountId}/nfts`}>
								<FormattedMessage id="accounts.breadcrumbs.nfts" defaultMessage="NFTs" />
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: () => <ResourceBreadcrumb resourceType="nft" />,
								sidebar: <ResourceDetails />,
							},
							children: [
								{
									path: ':nftId',
									handle: {
										crumb: ({ nftId }) => nftId,
										sidebar: <ResourceDetails />,
									},
								},
							],
						},
					],
				},
			],
		},
	],
}

export default route
