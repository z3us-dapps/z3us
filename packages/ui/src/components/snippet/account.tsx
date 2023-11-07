import React from 'react'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { getStringMetadata } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string-utils'

interface IProps {
	address: string
	reversed?: boolean
}

export const AccountSnippet: React.FC<IProps> = ({ address, reversed }) => {
	const { data, isLoading } = useEntityDetails(address)
	const addressBook = useAddressBook()

	const name = getStringMetadata('name', data?.metadata?.items)
	const dappAddress = getStringMetadata('dapp_definition', data?.metadata?.items)

	const { data: dappData } = useEntityDetails(dappAddress)

	const dappName = getStringMetadata('name', dappData?.metadata?.items)

	const displayName = addressBook[address]?.name || dappName || name

	if (isLoading) return <FallbackLoading />

	return (
		<Box display="flex" flexDirection={reversed ? 'row-reverse' : 'row'} gap="medium" alignItems="center">
			<ResourceImageIcon address={dappAddress || address} size="xlarge" />
			<Box display="flex" flexDirection="column" gap="xsmall">
				{displayName && (
					<Text align={reversed ? 'right' : 'left'} color="strong" weight="medium" size="small" truncate>
						{displayName}
					</Text>
				)}
				<Text align={reversed ? 'right' : 'left'} color="strong" size="small" truncate>
					{getShortAddress(address)}
				</Text>
			</Box>
		</Box>
	)
}
