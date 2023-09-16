import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Link } from 'ui/src/components/router-link'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { getStringMetadata } from 'ui/src/services/metadata'

const messages = defineMessages({
	resource: {
		id: 'accounts.breadcrumbs.resource',
		defaultMessage: 'Resource',
	},
})

interface IProps {
	resourceType: 'token' | 'nft'
}

export const ResourceBreadcrumb: React.FC<IProps> = ({ resourceType }) => {
	const intl = useIntl()
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
			{displayName || intl.formatMessage(messages.resource)}
		</Link>
	)
}
