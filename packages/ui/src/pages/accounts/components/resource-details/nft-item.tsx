import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { Close2Icon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { NftImageIcon } from 'ui/src/components/nft-image-icon'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'
import { getStringNftData } from 'ui/src/services/metadata'

import FieldValue from './field-value'
import * as styles from './styles.css'

const messages = defineMessages({
	back: {
		id: 'accounts.resource_details.nft_item.back',
		defaultMessage: 'Back',
	},
	burned: {
		id: 'accounts.resource_details.nft_item.burned',
		defaultMessage: '(burned)',
	},
	data: {
		id: 'accounts.resource_details.nft_item.data',
		defaultMessage: 'Data',
	},
})

const NftDetails: React.FC = () => {
	const intl = useIntl()
	const { accountId, resourceId, nftId: rawNftId } = useParams()
	const nftId = decodeURIComponent(rawNftId)
	const { data, isLoading } = useNonFungibleData(resourceId, nftId)

	const dataJson = data?.data.programmatic_json as any
	const name = getStringNftData('name', dataJson?.fields)
	const description = getStringNftData('description', dataJson?.fields)

	if (!resourceId) return null
	if (!nftId) return null

	if (isLoading) return <FallbackLoading />

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
						<NftImageIcon address={resourceId} id={nftId} />
					</Box>
					<Text size="large" color="strong">
						{`${name} ${nftId} ${data?.is_burned === true ? intl.formatMessage(messages.burned) : ''}`}
					</Text>
					<Text size="small">{description}</Text>
				</Box>
				<Box display="flex" paddingTop="large" gap="large" position="relative" paddingBottom="large">
					<CardButtons />
				</Box>

				<Box display="flex" flexDirection="column">
					<Box marginTop="xsmall" paddingBottom="medium">
						<Text size="medium" weight="medium" color="strong">
							{intl.formatMessage(messages.data)}
						</Text>
					</Box>
					{dataJson?.fields?.map(field => (
						<AccountsTransactionInfo
							key={field.field_name}
							leftTitle={
								<Text size="large" color="strong">
									{(field.field_name || ('' as string)).toUpperCase()}
								</Text>
							}
							rightData={
								<Text size="small">
									<FieldValue field={field} />
								</Text>
							}
						/>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default NftDetails
