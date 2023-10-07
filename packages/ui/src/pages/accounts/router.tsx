import { lazy } from 'react'
import { FormattedMessage } from 'react-intl'

import Layout from './components/layout'
import { AccountBreadcrumb } from './components/layout/components/breadcrumbs/account-breadcrumb'
import { LinkBreadcrumb } from './components/layout/components/breadcrumbs/link-breadcrumb'
import { NftItemBreadcrumb } from './components/layout/components/breadcrumbs/nft-item-breadcrumb'
import { ResourceBreadcrumb } from './components/layout/components/breadcrumbs/resource-breadcrumb'
import { BackButton } from './components/layout/components/mobile/back-button'

const Home = lazy(() => import('./home'))
const Tokens = lazy(() => import('./tokens'))
const LPTokens = lazy(() => import('./lp-tokens'))
const PoolUnits = lazy(() => import('./pool-units'))
const NftCollections = lazy(() => import('./nft-collections'))
const Nfts = lazy(() => import('./nfts'))

const ActivityList = lazy(() => import('./components/activity-list'))
const TokenDetails = lazy(() => import('./components/resource-details/token'))
const NftCollectionDetails = lazy(() => import('./components/resource-details/nft-collection'))
const NftDetails = lazy(() => import('./components/resource-details/nft-item'))

const route = {
	path: 'accounts',
	element: <Layout />,
	handle: {
		crumb: (_, isLast: boolean) => (
			<LinkBreadcrumb isLast={isLast} to="/accounts">
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
				crumb: (_, isLast: boolean) => <AccountBreadcrumb isLast={isLast} />,
			},
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: 'tokens',
					element: <Tokens />,
					handle: {
						backButton: <BackButton key="tokens" />,
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} key={accountId} to={`/accounts/${accountId}/tokens`}>
								<FormattedMessage id="accounts.breadcrumbs.tokens" defaultMessage="Tokens" />
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="token" />,
								sidebar: <TokenDetails />,
							},
						},
					],
				},
				{
					path: 'lp-tokens',
					element: <LPTokens />,
					handle: {
						backButton: <BackButton key="lp-tokens" />,
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} key={accountId} to={`/accounts/${accountId}/lp-tokens`}>
								<FormattedMessage id="accounts.breadcrumbs.lp_tokens" defaultMessage="Liquidity Pool Tokens" />
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="lp-token" />,
								sidebar: <TokenDetails />,
							},
						},
					],
				},
				{
					path: 'pool-units',
					element: <PoolUnits />,
					handle: {
						backButton: <BackButton key="pool-units" />,
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} key={accountId} to={`/accounts/${accountId}/pool-units`}>
								<FormattedMessage id="accounts.breadcrumbs.pool_units" defaultMessage="Pool Units" />
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="pool-unit" />,
								sidebar: <TokenDetails />,
							},
						},
					],
				},
				{
					path: 'nfts',
					children: [
						{
							index: true,
							element: <NftCollections />,
							handle: {
								backButton: <BackButton key="nfts" />,
								crumb: ({ accountId }, isLast: boolean) => (
									<LinkBreadcrumb isLast={isLast} key={accountId} to={`/accounts/${accountId}/nfts`}>
										<FormattedMessage id="accounts.breadcrumbs.nfts" defaultMessage="NFTs" />
									</LinkBreadcrumb>
								),
							},
						},
						{
							path: ':resourceId',
							element: <Nfts />,
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="nft" />,
								sidebar: <NftCollectionDetails />,
							},
							children: [
								{
									path: ':nftId',
									handle: {
										crumb: (_, isLast: boolean) => <NftItemBreadcrumb isLast={isLast} />,
										sidebar: <NftDetails />,
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
