import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Resource: React.FC = () => {
	const navigate = useNavigate()
	const { resource: id } = useParams<'resource'>()

	function onDismiss() {
		navigate(-1)
	}
	return (
		<div>
			<h1>Resource: {id}</h1>
			<button type="button" style={{ display: 'block' }} onClick={onDismiss}>
				Back
			</button>
		</div>
	)
}

export default Resource
