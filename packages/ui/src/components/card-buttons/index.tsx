import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ExternalLinkIcon, QrCode2Icon, RadixIcon, UpRight2Icon, Z3usIcon } from 'ui/src/components/icons'
import { QrPopOver } from 'ui/src/components/qr-popover'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useDashboardUrl } from 'ui/src/hooks/dapp/use-network'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import { ExplorerMenu } from 'ui/src/pages/accounts/components/layout/components/explorer-menu'

import * as styles from './styles.css'

interface IProps {
	className?: string
}

const messages = defineMessages({
	send: {
		id: '9WRlF4',
		defaultMessage: 'Send',
	},
	address: {
		id: 'hc47g1',
		defaultMessage: 'Address QR code',
	},
	open_radix_dashboard: {
		id: 'xxuT0a',
		defaultMessage: 'Open in Radix Dashboard',
	},
	open_z3us: {
		id: 'WAHvBA',
		defaultMessage: 'Open in Z3US.com',
	},
})

export const CardButtons: React.FC<IProps> = ({ className }) => {
	const location = useLocation()
	const { accountId = '-', resourceId, nftId: rawNftId } = useParams()
	const intl = useIntl()
	const dashboardUrl = useDashboardUrl()
	const { isWallet } = useZdtState()

	const qrValue = resourceId || accountId || '-'

	const query = new URLSearchParams()
	if (accountId !== '-') query.set('accountId', accountId)
	if (resourceId) query.set('resourceId', resourceId)
	if (rawNftId) query.set('nftId', rawNftId)

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message={intl.formatMessage(messages.send)}>
				<Button
					iconOnly
					rounded
					styleVariant="inverse"
					sizeVariant={{ mobile: 'medium', tablet: 'large' }}
					to={`/transfer?${query}`}
				>
					<UpRight2Icon />
				</Button>
			</ToolTip>
			{qrValue !== '-' && (
				<QrPopOver address={qrValue}>
					<ToolTip message={intl.formatMessage(messages.address)}>
						<Button iconOnly rounded styleVariant="inverse" sizeVariant={{ mobile: 'medium', tablet: 'large' }}>
							<QrCode2Icon />
						</Button>
					</ToolTip>
				</QrPopOver>
			)}

			<ExplorerMenu
				radixExplorerUrl={
					rawNftId ? `${dashboardUrl}/nft/${resourceId}%3A${rawNftId}` : `${dashboardUrl}/resource/${resourceId}`
				}
				z3usExplorerUrl={`https://z3us.com/#${location.pathname}`}
				trigger={
					<Button iconOnly rounded styleVariant="inverse" sizeVariant={{ mobile: 'medium', tablet: 'large' }}>
						<ExternalLinkIcon />
					</Button>
				}
			/>
		</Box>
	)
}
