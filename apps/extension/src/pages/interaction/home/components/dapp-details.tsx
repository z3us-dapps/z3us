import { Box } from 'packages/ui/src/components/box'
import { ResourceImageIcon } from 'packages/ui/src/components/resource-image-icon'
import React from 'react'

import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { getStringMetadata } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string-utils'

interface IProps {
	dAppDefinitionAddress: string
	origin?: string
}

export const DappDetails: React.FC<IProps> = ({ dAppDefinitionAddress, origin }) => {
	const { data } = useEntityMetadata(dAppDefinitionAddress)
	const name = getStringMetadata('name', data)

	return (
		<Box display="flex" justifyContent="center" gap="small" alignItems="center">
			<ResourceImageIcon size="xlarge" address={dAppDefinitionAddress} />
			<h1>{name || origin || getShortAddress(dAppDefinitionAddress)}</h1>
		</Box>
	)
}
