import React from 'react'
import { useParams } from 'react-router-dom'

import BaseResourceDetails from 'ui/src/components/resource/resource'

const ResourceDetails: React.FC = () => {
	const { resourceId } = useParams()

	return <BaseResourceDetails resourceId={resourceId} />
}

export default ResourceDetails
