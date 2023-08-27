import { useEntityMetadata, useMetadataValue } from 'ui/src/hooks/dapp/use-entity-metadata'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'

interface IProps {
	resourceType: 'token' | 'nft'
}
export const ResourceBreadcrumb: React.FC<IProps> = ({ resourceType }) => {
	const { accountId, resourceId } = useParams()
	const { data } = useEntityMetadata(resourceId)

	const name = useMetadataValue('name', data)
	const symbol = useMetadataValue('symbol', data)

	const [displayName, setDisplayName] = useState<string>('')

	useEffect(() => {
		setDisplayName(symbol ? symbol.toUpperCase() : name)
	}, [name, symbol])

	return (
		<Link to={`/accounts/${accountId}/${resourceType}s/${resourceId}`}>
			{displayName || <Translation text="accounts.breadcrumbs.resource" />}
		</Link>
	)
}
