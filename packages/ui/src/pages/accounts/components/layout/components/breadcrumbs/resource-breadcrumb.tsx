import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { getStringMetadata } from 'ui/src/services/metadata'

interface IProps {
	resourceType: 'token' | 'nft'
}
export const ResourceBreadcrumb: React.FC<IProps> = ({ resourceType }) => {
	const { accountId, resourceId } = useParams()
	const { data } = useEntityMetadata(resourceId)

	const name = getStringMetadata('name', data)
	const symbol = getStringMetadata('symbol', data)

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
