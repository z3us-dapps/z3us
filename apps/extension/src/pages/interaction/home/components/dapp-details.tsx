import { Box } from 'packages/ui/src/components/box'
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
		<Box justifyContent="center" textAlign="center">
			<h1>{name || origin || getShortAddress(dAppDefinitionAddress)}</h1>
		</Box>
	)
}
