import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { ChevronRightIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'
import { useNonFungibleData } from 'ui/src/hooks/dapp/use-entity-nft'
import { findFieldValue } from 'ui/src/services/metadata'

const messages = defineMessages({
	item: {
		id: 'q7eony',
		defaultMessage: `{hasDisplayName, select,
			true {{displayName}}
			other {NFT}
		}`,
	},
})

interface IProps {
	isLast?: boolean
}

export const NftItemBreadcrumb: React.FC<IProps> = ({ isLast }) => {
	const intl = useIntl()
	const { accountId, resourceId, nftId: rawNftId } = useParams()
	const nftId = rawNftId ? decodeURIComponent(rawNftId) : undefined
	const { data } = useNonFungibleData(resourceId, nftId)

	const dataJson = data?.data?.programmatic_json as any
	const name = findFieldValue('name', dataJson?.fields)

	const [displayName, setDisplayName] = useState<string>('')

	useEffect(() => {
		setDisplayName(name)
	}, [name])

	const content = intl.formatMessage(messages.item, { hasDisplayName: !!displayName, displayName })

	return (
		<>
			<ChevronRightIcon />
			{isLast ? (
				<Text>{content}</Text>
			) : (
				<Link to={`/accounts/${accountId}/nfts/${resourceId}/${nftId}`}>{content}</Link>
			)}
		</>
	)
}
