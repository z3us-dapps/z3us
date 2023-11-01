import BaseResourceDetails from 'packages/ui/src/components/resource/resource'
import React from 'react'
import { useParams } from 'react-router-dom'

const ResourceDetails: React.FC = () => {
	const { resourceId } = useParams()

	return <BaseResourceDetails resourceId={resourceId} />
}

export default ResourceDetails
