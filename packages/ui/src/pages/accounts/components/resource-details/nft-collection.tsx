import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'
import { Close2Icon, LockIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import Loader from 'ui/src/components/loader'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { getStringMetadata } from 'ui/src/services/metadata'

import MetadataValue from './metadata-value'
import * as styles from './styles.css'

const messages = defineMessages({
	back: {
		id: 'accounts.resource_details.nft_collection.back',
		defaultMessage: 'Back',
	},
	metadata: {
		id: 'accounts.resource_details.nft_collection.metadata',
		defaultMessage: 'Metadata',
	},
	summary: {
		id: 'accounts.resource_details.nft_collection.summary',
		defaultMessage: 'Summary',
	},
	details_address: {
		id: 'accounts.resource_details.nft_collection.details_address',
		defaultMessage: 'Address',
	},
	details_id_type: {
		id: 'accounts.resource_details.nft_collection.details_id_type',
		defaultMessage: 'ID Type',
	},
	details_total_supply: {
		id: 'accounts.resource_details.nft_collection.details_total_supply',
		defaultMessage: 'Total supply',
	},
	details_total_minted: {
		id: 'accounts.resource_details.nft_collection.details_total_minted',
		defaultMessage: 'Total minted',
	},
	details_total_burned: {
		id: 'accounts.resource_details.nft_collection.details_total_burned',
		defaultMessage: 'Total burned',
	},
})

const NftCollectionDetails: React.FC = () => {
	const intl = useIntl()
	const { resourceId, accountId } = useParams()
	const { data, isLoading } = useEntityDetails(resourceId)

	const name = getStringMetadata('name', data?.metadata?.items)
	const description = getStringMetadata('description', data?.metadata?.items)

	if (!resourceId) return null
	if (isLoading) return <Loader />

	return (
		<Box flexShrink={0}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box className={styles.assetCloseBtnWrapper}>
					<ToolTip message={intl.formatMessage(messages.back)}>
						<Button iconOnly styleVariant="ghost" sizeVariant="small" to={`/accounts/${accountId}/${resourceId}`}>
							<Close2Icon />
						</Button>
					</ToolTip>
				</Box>
				<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
					<Box paddingBottom="small">
						<ResourceImageIcon address={resourceId} />
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
								{intl.formatNumber(+data?.details?.total_supply || 0, {
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
								{intl.formatNumber(+data?.details?.total_minted || 0, {
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
								{intl.formatNumber(+data?.details?.total_burned || 0, {
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
					{data?.metadata.items.map(item => (
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
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default NftCollectionDetails
