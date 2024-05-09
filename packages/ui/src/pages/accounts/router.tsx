import { FormattedMessage } from 'react-intl'

import { ToolTip } from 'ui/src/components/tool-tip'

import ActivityList from './components/activity-list'
import Layout from './components/layout'
import { AccountBreadcrumb } from './components/layout/components/breadcrumbs/account-breadcrumb'
import { LinkBreadcrumb } from './components/layout/components/breadcrumbs/link-breadcrumb'
import { NftItemBreadcrumb } from './components/layout/components/breadcrumbs/nft-item-breadcrumb'
import { ResourceBreadcrumb } from './components/layout/components/breadcrumbs/resource-breadcrumb'
import NftDetails from './components/nft-details'
import ResourceDetails from './components/resource-details'
import Home from './home'
import LPUs from './lpus'
import LSUS from './lsus'
import NftCollections from './nft-collections'
import NFTs from './nfts'
import Tokens from './tokens'

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
				...['lsus', 'lp-tokens'].map(path => ({
					path,
					element: <LSUS />,
					handle: {
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} to={`/accounts/${accountId}/lsus`}>
								<ToolTip message={<FormattedMessage id="AgA3Nu" defaultMessage="Liquid Stake Units" />}>
									<span>
										<FormattedMessage id="zspeCR" defaultMessage="LSUs" />
									</span>
								</ToolTip>
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="lsu" />,
								sidebar: <ResourceDetails />,
							},
						},
					],
				})),
				...['lpus', 'pool-units'].map(path => ({
					path,
					element: <LPUs />,
					handle: {
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} to={`/accounts/${accountId}/lpus`}>
								<ToolTip message={<FormattedMessage id="lR39xr" defaultMessage="Liquidity Pool Units" />}>
									<span>
										<FormattedMessage id="uLpYbE" defaultMessage="LPUs" />
									</span>
								</ToolTip>
							</LinkBreadcrumb>
						),
					},
					children: [
						{
							path: ':resourceId',
							handle: {
								crumb: (_, isLast: boolean) => <ResourceBreadcrumb isLast={isLast} resourceType="lpu" />,
								sidebar: <ResourceDetails />,
							},
						},
					],
				})),
				{
					path: 'nfts',
					handle: {
						crumb: ({ accountId }, isLast: boolean) => (
							<LinkBreadcrumb isLast={isLast} to={`/accounts/${accountId}/nfts`}>
								<ToolTip message={<FormattedMessage id="vYHKVC" defaultMessage="Non-Fungible Tokens" />}>
									<span>
										<FormattedMessage id="nqRscq" defaultMessage="NFTs" />
									</span>
								</ToolTip>
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
							element: <NFTs />,
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
