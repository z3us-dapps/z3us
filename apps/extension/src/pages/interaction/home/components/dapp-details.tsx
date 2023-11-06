import React from 'react'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
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
		<Box display="flex" flexDirection="column" gap="xsmall" alignItems="center" justifyContent="center">
			<ResourceImageIcon size={{ mobile: 'xlarge', tablet: 'xxlarge' }} address={dAppDefinitionAddress} />
			<Text color="strong" size="xlarge" weight="strong">
				{name || origin || getShortAddress(dAppDefinitionAddress)}
			</Text>
		</Box>
	)
}
