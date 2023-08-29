import Loader from 'ui/src/components/loader'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useMetadataValue } from 'ui/src/hooks/dapp/use-entity-metadata'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Text } from 'ui/src/components/typography'

const ResourceDetails: React.FC = () => {
	const { resourceId } = useParams()
	const { data = [], isLoading } = useEntityDetails(resourceId)
	const details = data[0] || null

	const name = useMetadataValue('name', details?.explicit_metadata.items)

	if (isLoading) return <Loader />

	return (
		<Text capitalizeFirstLetter color="strong" weight="strong" size="medium">
			{name}
		</Text>
	)
}

export default ResourceDetails
