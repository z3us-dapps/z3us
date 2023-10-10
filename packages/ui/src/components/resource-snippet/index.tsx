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
}

export const ResourceSnippet: React.FC<IProps> = ({ address }) => {
	const { data, isLoading } = useEntityDetails(address)
	const addressBook = useAddressBook()

	const name = getStringMetadata('name', data?.metadata?.items)
	const dappAddress = getStringMetadata('dapp_definition', data?.metadata?.items)

	const { data: dappData } = useEntityDetails(dappAddress)

	const dappName = getStringMetadata('name', dappData?.metadata?.items)

	const displayName = addressBook[address]?.name || dappName || name || getShortAddress(address)

	if (isLoading) return <FallbackLoading />

	return (
		<Box display="flex" flexDirection="row" gap="small">
			<ResourceImageIcon address={dappAddress || address} />
			<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
				{displayName}
			</Text>
		</Box>
	)
}
