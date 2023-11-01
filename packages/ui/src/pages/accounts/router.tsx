import { lazy } from 'react'
import { FormattedMessage } from 'react-intl'

import Layout from './components/layout'
import { AccountBreadcrumb } from './components/layout/components/breadcrumbs/account-breadcrumb'
import { LinkBreadcrumb } from './components/layout/components/breadcrumbs/link-breadcrumb'
import { NftItemBreadcrumb } from './components/layout/components/breadcrumbs/nft-item-breadcrumb'
import { ResourceBreadcrumb } from './components/layout/components/breadcrumbs/resource-breadcrumb'

const Home = lazy(() => import('./home'))
const Tokens = lazy(() => import('./tokens'))
const LPTokens = lazy(() => import('./lp-tokens'))
const PoolUnits = lazy(() => import('./pool-units'))
const NftCollections = lazy(() => import('./nft-collections'))
const Nfts = lazy(() => import('./nfts'))

const ActivityList = lazy(() => import('./components/activity-list'))
const ResourceDetails = lazy(() => import('./components/resource-details'))
const NftDetails = lazy(() => import('ui/src/components/resource/nft'))

const route = {
	path: 'accounts',
	element: <Layout />,
	handle: {
		crumb: (_, isLast: boolean) => (
			<LinkBreadcrumb isFirst isLast={isLast} to="/accounts">
				<FormattedMessage id="V2XmDf" defaultMessage="All accounts" />
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
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} to={`/accounts/${accountId}/tokens`}>
								<FormattedMessage id="P6EE/a" defaultMessage="Tokens" />
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="token" />,
								sidebar: <ResourceDetails />,
							},
						},
					],
				},
				{
					path: 'lp-tokens',
					element: <LPTokens />,
					handle: {
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} to={`/accounts/${accountId}/lp-tokens`}>
								<FormattedMessage id="ya5Lxf" defaultMessage="Liquidity Pool Tokens" />
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="lp-token" />,
								sidebar: <ResourceDetails />,
							},
						},
					],
				},
				{
					path: 'pool-units',
					element: <PoolUnits />,
					handle: {
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} to={`/accounts/${accountId}/pool-units`}>
								<FormattedMessage id="h/CJ+m" defaultMessage="Pool Units" />
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="pool-unit" />,
								sidebar: <ResourceDetails />,
							},
						},
					],
				},
				{
					path: 'nfts',
					handle: {
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} to={`/accounts/${accountId}/nfts`}>
								<FormattedMessage id="nqRscq" defaultMessage="NFTs" />
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							index: true,
							element: <NftCollections />,
						},
						{
							path: ':resourceId',
							element: <Nfts />,
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="nft" />,
								sidebar: <ResourceDetails />,
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
