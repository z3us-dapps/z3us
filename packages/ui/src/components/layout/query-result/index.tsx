import React from 'react'
import { useSearchParams } from 'react-router-dom'

import { SlideOutDialog } from 'ui/src/components/layout/slide-out-dialog'
import ResourceDetails from 'ui/src/components/resource/resource'

export const QueryResult = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const resourceId = searchParams.get('query')
	const isVisible = !!resourceId

	const navigateBack = () => {
		searchParams.delete('query')
		setSearchParams(searchParams)
	}

	return (
		<SlideOutDialog open={isVisible} onClose={navigateBack}>
			<ResourceDetails resourceId={resourceId} hideButtons />
		</SlideOutDialog>
	)
}
