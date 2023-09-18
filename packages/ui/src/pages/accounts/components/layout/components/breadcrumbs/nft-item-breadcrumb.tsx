import { useNonFungibleData } from 'packages/ui/src/hooks/dapp/use-entity-nft'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams, useSearchParams } from 'react-router-dom'

import { Link } from 'ui/src/components/router-link'
import { getStringNftData } from 'ui/src/services/metadata'

const messages = defineMessages({
	item: {
		id: 'accounts.breadcrumbs.nft_item',
		defaultMessage: 'NFT',
	},
})

export const NftItemBreadcrumb: React.FC = () => {
	const intl = useIntl()
	const [searchParams] = useSearchParams()
	const nftId = searchParams.get('nft')
	const { accountId, resourceId } = useParams()
	const { data } = useNonFungibleData(resourceId, nftId)

	const dataJson = data?.data.programmatic_json as any
	const name = getStringNftData('name', dataJson?.fields)

	const [displayName, setDisplayName] = useState<string>('')

	useEffect(() => {
		setDisplayName(name)
	}, [name])

	return (
		<Link to={`/accounts/${accountId}/nfts/${resourceId}`}>{displayName || intl.formatMessage(messages.item)}</Link>
	)
}
