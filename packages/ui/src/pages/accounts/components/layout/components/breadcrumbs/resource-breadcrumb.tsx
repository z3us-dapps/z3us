import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { ChevronRightIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { getStringMetadata } from 'ui/src/services/metadata'

const messages = defineMessages({
	resource: {
		id: 'accounts.breadcrumbs.resource',
		defaultMessage: `{hasDisplayName, select,
			true {{displayName}}
			other {Resource}
		}`,
	},
})

interface IProps {
	isLast?: boolean
	resourceType: 'token' | 'nft' | 'lp-token' | 'pool-unit'
}

export const ResourceBreadcrumb: React.FC<IProps> = ({ isLast, resourceType }) => {
	const intl = useIntl()
	const { accountId, resourceId } = useParams()
	const { data } = useEntityMetadata(resourceId)

	const name = getStringMetadata('name', data)
	const symbol = getStringMetadata('symbol', data)

	const [displayName, setDisplayName] = useState<string>('')

	useEffect(() => {
		setDisplayName(symbol ? symbol.toUpperCase() : name)
	}, [name, symbol])

	const content = intl.formatMessage(messages.resource, { hasDisplayName: !!displayName, displayName })

	return (
		<>
			<ChevronRightIcon />
			{isLast ? (
				<Text>{content}</Text>
			) : (
				<Link to={`/accounts/${accountId}/${resourceType}s/${resourceId}`}>{content}</Link>
			)}
		</>
	)
}
