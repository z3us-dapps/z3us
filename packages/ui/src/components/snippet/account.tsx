import React from 'react'

import { AccountCardIcon } from 'ui/src/components/account-cards'
import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { findMetadataValue } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string-utils'

interface IProps {
	address: string
	reversed?: boolean
}

export const AccountSnippet: React.FC<IProps> = ({ address, reversed }) => {
	const { data, isLoading } = useEntityDetails(address)
	const addressBook = useAddressBook()

	const name = findMetadataValue('name', data?.metadata?.items)
	const dappAddress = findMetadataValue('dapp_definition', data?.metadata?.items)

	const { data: dappData } = useEntityDetails(dappAddress)

	const dappName = findMetadataValue('name', dappData?.metadata?.items)
	const imageResourceAddress = dappAddress || address
	const displayName = addressBook[address]?.name || dappName || name

	if (isLoading) return <FallbackLoading />

	return (
		<Box display="flex" flexDirection={reversed ? 'row-reverse' : 'row'} gap="medium" alignItems="center">
			{addressBook[address] ? (
				<AccountCardIcon address={imageResourceAddress} />
			) : (
				<ResourceImageIcon address={imageResourceAddress} size="xlarge" />
			)}
			<Box display="flex" flexDirection="column">
				{displayName && (
					<Box paddingRight="large">
						<Text align={reversed ? 'right' : 'left'} color="strong" weight="medium" size="small" truncate>
							{displayName}
						</Text>
					</Box>
				)}
				<ToolTip message={address}>
					<Box>
						<Text align={reversed ? 'right' : 'left'} color="strong" size="xsmall" truncate>
							{getShortAddress(address)}
						</Text>
					</Box>
				</ToolTip>
			</Box>
		</Box>
	)
}
