import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ExternalLinkIcon, InformationIcon, QrCode2Icon, StakingIcon, UpRight2Icon } from 'ui/src/components/icons'
import { QrPopOver } from 'ui/src/components/qr-popover'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useSelectedAccountsBalances } from 'ui/src/hooks/dapp/use-balances'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useDashboardUrl } from 'ui/src/hooks/dapp/use-network'
import { useAccountIndexes } from 'ui/src/hooks/use-account-indexes'
import { ExplorerMenu } from 'ui/src/pages/accounts/components/layout/components/explorer-menu'
import { findMetadataValue } from 'ui/src/services/metadata'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

interface IProps {
	className?: string
}

const messages = defineMessages({
	send: {
		id: '9WRlF4',
		defaultMessage: 'Send',
	},
	staking: {
		id: 'SajJ1U',
		defaultMessage: 'Stake / Unstake',
	},
	address: {
		id: 'hc47g1',
		defaultMessage: 'Address QR code',
	},
})

export const CardButtons: React.FC<IProps> = ({ className }) => {
	const location = useLocation()
	const accountIndexes = useAccountIndexes()
	const { accountId = '-', resourceId, nftId: rawNftId } = useParams()
	const intl = useIntl()
	const dashboardUrl = useDashboardUrl()

	const {
		data: { balances = [] },
	} = useSelectedAccountsBalances()
	const resourceBalance = balances.find(balance => balance.address === resourceId)
	const [defaultNftId] = (resourceBalance as ResourceBalance[ResourceBalanceType.NON_FUNGIBLE])?.ids || []

	const { data } = useEntityDetails(resourceId)
	const validator = findMetadataValue('validator', data?.metadata?.items)
	const infoUrl = findMetadataValue('info_url', data?.metadata?.items)

	const resolvedRawNft = rawNftId || (defaultNftId ? encodeURIComponent(defaultNftId) : '')
	const resolvedAccountId = (accountId !== '-' ? accountId : Object.keys(accountIndexes)?.[0]) || accountId
	const qrValue = resourceId || resolvedAccountId

	const query = new URLSearchParams()
	if (accountId !== '-') query.set('accountId', accountId)
	if (resourceId) query.set('resourceId', resourceId)
	if (resolvedRawNft) query.set('nftId', resolvedRawNft)

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message={intl.formatMessage(messages.send)}>
				<Button
					iconOnly
					rounded
					styleVariant="inverse"
					sizeVariant={{ mobile: 'large', tablet: 'large' }}
					to={`/transfer?${query}`}
				>
					<UpRight2Icon />
				</Button>
			</ToolTip>

			{qrValue !== '-' && (
				<QrPopOver address={qrValue}>
					<ToolTip message={intl.formatMessage(messages.address)}>
						<Button iconOnly rounded styleVariant="inverse" sizeVariant={{ mobile: 'large', tablet: 'large' }}>
							<QrCode2Icon />
						</Button>
					</ToolTip>
				</QrPopOver>
			)}

			{validator && (
				<ToolTip message={intl.formatMessage(messages.staking)}>
					<Button
						iconOnly
						rounded
						styleVariant="inverse"
						sizeVariant={{ mobile: 'large', tablet: 'large' }}
						to={`${dashboardUrl}/network-staking/${validator}`}
						target="_blank"
					>
						<StakingIcon />
					</Button>
				</ToolTip>
			)}

			{infoUrl && (
				<ToolTip message={intl.formatMessage(messages.staking)}>
					<Button
						iconOnly
						rounded
						styleVariant="inverse"
						sizeVariant={{ mobile: 'large', tablet: 'large' }}
						to={infoUrl}
						target="_blank"
					>
						<InformationIcon />
					</Button>
				</ToolTip>
			)}

			{resolvedAccountId !== '-' && !resourceId && (
				<ExplorerMenu
					radixExplorerUrl={`${dashboardUrl}/account/${resolvedAccountId}`}
					z3usExplorerUrl={`https://z3us.com/#/accounts/${resolvedAccountId}`}
					trigger={
						<Button iconOnly rounded styleVariant="inverse" sizeVariant={{ mobile: 'large', tablet: 'large' }}>
							<ExternalLinkIcon />
						</Button>
					}
				/>
			)}

			{resourceId && (
				<ExplorerMenu
					radixExplorerUrl={
						rawNftId ? `${dashboardUrl}/nft/${resourceId}%3A${rawNftId}` : `${dashboardUrl}/resource/${resourceId}`
					}
					z3usExplorerUrl={`https://z3us.com/#${location.pathname}`}
					trigger={
						<Button iconOnly rounded styleVariant="inverse" sizeVariant={{ mobile: 'large', tablet: 'large' }}>
							<ExternalLinkIcon />
						</Button>
					}
				/>
			)}
		</Box>
	)
}
