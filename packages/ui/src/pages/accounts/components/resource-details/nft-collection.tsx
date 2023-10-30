import { ImageIcon } from 'packages/ui/src/components/image-icon'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { LockIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import MetadataValue from 'ui/src/components/metadata-value'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { getStringMetadata } from 'ui/src/services/metadata'

const IGNORE_METADATA = ['name', 'description', 'icon_url']

const messages = defineMessages({
	back: {
		id: 'cyR7Kh',
		defaultMessage: 'Back',
	},
	metadata: {
		id: 'aCrVj1',
		defaultMessage: 'Other details',
	},
	summary: {
		id: 'RrCui3',
		defaultMessage: 'Summary',
	},
	details_address: {
		id: 'e6Ph5+',
		defaultMessage: 'Address',
	},
	details_id_type: {
		id: 'kP+DW+',
		defaultMessage: 'ID Type',
	},
	details_total_supply: {
		id: '/kI0V9',
		defaultMessage: 'Total supply',
	},
	details_total_minted: {
		id: 'ZYosl3',
		defaultMessage: 'Total minted',
	},
	details_total_burned: {
		id: '/B/zOD',
		defaultMessage: 'Total burned',
	},
})

const NftCollectionDetails: React.FC = () => {
	const intl = useIntl()
	const { resourceId } = useParams()
	const { data, isLoading } = useEntityDetails(resourceId)

	const name = getStringMetadata('name', data?.metadata?.items)
	const description = getStringMetadata('description', data?.metadata?.items)
	const image = getStringMetadata('key_image_url', data?.metadata?.items)

	if (!resourceId) return null
	if (isLoading) return <FallbackLoading />

	return (
		<Box flexShrink={0}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
					<Box paddingBottom="small">
						<ImageIcon imgSrc={image} imgAlt={name} fallbackText={name} />
					</Box>
					<Text size="large" color="strong">
						{name}
					</Text>
					<Text size="small">{description}</Text>
				</Box>
				<Box display="flex" paddingTop="large" gap="large" position="relative" paddingBottom="large">
					<CardButtons />
				</Box>

				<Box display="flex" flexDirection="column">
					<Box marginTop="xsmall" paddingBottom="medium">
						<Text size="medium" weight="medium" color="strong">
							{intl.formatMessage(messages.summary)}
						</Text>
					</Box>
					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_address)}
							</Text>
						}
						rightData={<Text size="small">{resourceId}</Text>}
					/>
					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_id_type)}
							</Text>
						}
						rightData={<Text size="small">{data?.details?.non_fungible_id_type}</Text>}
					/>
					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_total_supply)}
							</Text>
						}
						rightData={
							<Text size="small">
								{intl.formatNumber(parseFloat(data?.details?.total_supply) || 0, {
									style: 'decimal',
									maximumFractionDigits: 8,
								})}
							</Text>
						}
					/>
					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_total_minted)}
							</Text>
						}
						rightData={
							<Text size="small">
								{intl.formatNumber(parseFloat(data?.details?.total_minted) || 0, {
									style: 'decimal',
									maximumFractionDigits: 8,
								})}
							</Text>
						}
					/>
					<AccountsTransactionInfo
						leftTitle={
							<Text size="large" color="strong">
								{intl.formatMessage(messages.details_total_burned)}
							</Text>
						}
						rightData={
							<Text size="small">
								{intl.formatNumber(parseFloat(data?.details?.total_burned) || 0, {
									style: 'decimal',
									maximumFractionDigits: 8,
								})}
							</Text>
						}
					/>
				</Box>

				<Box display="flex" flexDirection="column">
					<Box marginTop="xsmall" paddingBottom="medium">
						<Text size="medium" weight="medium" color="strong">
							{intl.formatMessage(messages.metadata)}
						</Text>
					</Box>
					{data?.metadata.items.map(item =>
						IGNORE_METADATA.includes(item.key) ? null : (
							<AccountsTransactionInfo
								key={item.key}
								leftTitle={
									<Text size="large" color="strong">
										{item.is_locked === true && <LockIcon />}
										{(item.key as string).toUpperCase()}
									</Text>
								}
								rightData={
									<Text size="small">
										<MetadataValue value={item} />
									</Text>
								}
							/>
						),
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default NftCollectionDetails
