import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { SlideOutDialog } from 'ui/src/components/layout/slide-out-dialog'
import ResourceDetails from 'ui/src/components/resource/resource'

export const QueryResult = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const resourceId = searchParams.get('query')
	const isVisible = !!resourceId

	const navigateBack = () => {
		const [, params] = location.search.split('?')
		const query = new URLSearchParams(params)
		query.delete('query')
		navigate(`${location.pathname}?${query}`)
	}

	return (
		<SlideOutDialog open={isVisible} onClose={navigateBack}>
			<ResourceDetails resourceId={resourceId} hideButtons />
		</SlideOutDialog>
	)
}
